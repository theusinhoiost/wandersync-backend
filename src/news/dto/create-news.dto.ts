import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "userId": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "id": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "title": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "slug": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "author": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "content": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "excerpt": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "coverImageUrl": string;
    @IsBoolean({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "published": boolean;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "created_at": string;
    @IsString({ message: 'O nome deve ser valido' })
    @IsNotEmpty({ message: 'O nome não pode estar vazia' })
    "updated_at": string;
}
