import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';


@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  // ------------------------
  // PUBLIC
  // ------------------------

  @Get()
  listPublished() {
    return this.newsService.listPublished();
  }

  @Get(':slug')
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.newsService.findPublishedBySlug(slug);
  }

  // ------------------------
  // ADMIN
  // ------------------------

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  listAll() {
    return this.newsService.listAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/:slug')
  findBySlugAdmin(@Param('slug') slug: string) {
    return this.newsService.findBySlugAdmin(slug);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateNewsDto) {
    return this.newsService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateNewsDto>) {
    return this.newsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Post(':id/publish')
  publish(@Param('id') id: string, @Body() body: { published: boolean }) {
    return this.newsService.setPublished(id, !!body?.published);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
