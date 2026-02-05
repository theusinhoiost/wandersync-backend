import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {

    @IsString({ message: 'O título deve ser um texto válido' })
    @IsNotEmpty({ message: 'O título não pode estar vazio' })
    title: string;

    @IsString({ message: 'O slug deve ser um texto válido' })
    @IsNotEmpty({ message: 'O slug não pode estar vazio' })
    slug: string;

    @IsString({ message: 'O conteúdo deve ser um texto válido' })
    @IsNotEmpty({ message: 'O conteúdo não pode estar vazio' })
    content: string;

    @IsString({ message: 'O resumo deve ser um texto válido' })
    @IsNotEmpty({ message: 'O resumo não pode estar vazio' })
    excerpt: string;

    @IsString({ message: 'A imagem de capa deve ser uma URL válida' })
    @IsNotEmpty({ message: 'A imagem de capa não pode estar vazia' })
    coverImageUrl: string;

    @IsBoolean({ message: 'Publicado deve ser true ou false' })
    published: boolean;
}
