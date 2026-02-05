import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import type Database from 'better-sqlite3';
import { CreateNewsDto } from './dto/create-news.dto';

type NewsRow = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  published: 0 | 1;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class NewsService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: Database,
  ) { }

  // ------------------------
  // CREATE (admin)
  // ------------------------
  create(authorId: string, dto: CreateNewsDto) {
    const id = randomUUID();

    // garante published como 0/1
    const published = dto.published ? 1 : 0;

    try {
      const stmt = this.db.prepare(`
        INSERT INTO news (
          id, author_id, title, slug, content, excerpt, cover_image_url, published, created_at, updated_at
        ) VALUES (
          @id, @author_id, @title, @slug, @content, @excerpt, @cover_image_url, @published,
          datetime('now'), datetime('now')
        )
      `);

      stmt.run({
        id,
        author_id: authorId,
        title: dto.title.trim(),
        slug: dto.slug.trim(),
        content: dto.content,
        excerpt: dto.excerpt,
        cover_image_url: dto.coverImageUrl.trim(),
        published,
      });

      return this.findById(id);
    } catch (e: any) {
      // UNIQUE(slug) costuma estourar assim no sqlite
      if (typeof e?.message === 'string' && e.message.includes('UNIQUE') && e.message.includes('news.slug')) {
        throw new BadRequestException('Slug já existe. Escolha outro.');
      }
      throw new InternalServerErrorException('Erro ao criar notícia');
    }
  }

  // ------------------------
  // READ (public)
  // ------------------------
  listPublished() {
    const rows = this.db
      .prepare(
        `SELECT * FROM news WHERE published = 1 ORDER BY created_at DESC`,
      )
      .all() as NewsRow[];

    return rows.map(this.mapRow);
  }

  findPublishedBySlug(slug: string) {
    const row = this.db
      .prepare(
        `SELECT * FROM news WHERE slug = ? AND published = 1 LIMIT 1`,
      )
      .get(slug) as NewsRow | undefined;

    if (!row) throw new NotFoundException('Notícia não encontrada');
    return this.mapRow(row);
  }

  // ------------------------
  // READ (admin)
  // ------------------------
  listAll() {
    const rows = this.db
      .prepare(`SELECT * FROM news ORDER BY created_at DESC`)
      .all() as NewsRow[];

    return rows.map(this.mapRow);
  }

  findById(id: string) {
    const row = this.db
      .prepare(`SELECT * FROM news WHERE id = ? LIMIT 1`)
      .get(id) as NewsRow | undefined;

    if (!row) throw new NotFoundException('Notícia não encontrada');
    return this.mapRow(row);
  }

  findBySlugAdmin(slug: string) {
    const row = this.db
      .prepare(`SELECT * FROM news WHERE slug = ? LIMIT 1`)
      .get(slug) as NewsRow | undefined;

    if (!row) throw new NotFoundException('Notícia não encontrada');
    return this.mapRow(row);
  }

  // ------------------------
  // UPDATE (admin)
  // ------------------------
  update(id: string, dto: Partial<CreateNewsDto>) {
    // garante que existe
    this.findById(id);

    const fields: string[] = [];
    const params: any = { id };

    if (dto.title !== undefined) {
      fields.push('title = @title');
      params.title = dto.title.trim();
    }
    if (dto.slug !== undefined) {
      fields.push('slug = @slug');
      params.slug = dto.slug.trim();
    }
    if (dto.content !== undefined) {
      fields.push('content = @content');
      params.content = dto.content;
    }
    if (dto.excerpt !== undefined) {
      fields.push('excerpt = @excerpt');
      params.excerpt = dto.excerpt;
    }
    if (dto.coverImageUrl !== undefined) {
      fields.push('cover_image_url = @cover_image_url');
      params.cover_image_url = dto.coverImageUrl.trim();
    }
    if (dto.published !== undefined) {
      fields.push('published = @published');
      params.published = dto.published ? 1 : 0;
    }

    if (fields.length === 0) {
      throw new BadRequestException('Nada para atualizar');
    }

    try {
      const sql = `
        UPDATE news
        SET ${fields.join(', ')}, updated_at = datetime('now')
        WHERE id = @id
      `;

      this.db.prepare(sql).run(params);
      return this.findById(id);
    } catch (e: any) {
      if (typeof e?.message === 'string' && e.message.includes('UNIQUE') && e.message.includes('news.slug')) {
        throw new BadRequestException('Slug já existe. Escolha outro.');
      }
      throw new InternalServerErrorException('Erro ao atualizar notícia');
    }
  }

  // ------------------------
  // PUBLISH/UNPUBLISH (admin)
  // ------------------------
  setPublished(id: string, published: boolean) {
    this.findById(id);

    this.db
      .prepare(
        `UPDATE news SET published = ?, updated_at = datetime('now') WHERE id = ?`,
      )
      .run(published ? 1 : 0, id);

    return this.findById(id);
  }

  // ------------------------
  // DELETE (admin)
  // ------------------------
  remove(id: string) {
    // garante que existe
    this.findById(id);

    this.db.prepare(`DELETE FROM news WHERE id = ?`).run(id);
    return { message: 'Notícia removida com sucesso' };
  }

  // ------------------------
  // Helpers
  // ------------------------
  private mapRow(row: NewsRow) {
    return {
      id: row.id,
      authorId: row.author_id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      coverImageUrl: row.cover_image_url,
      published: row.published === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
