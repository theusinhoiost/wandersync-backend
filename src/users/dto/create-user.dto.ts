import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsMobilePhone,
    IsOptional,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString({ message: "O nome deve ser válido" })
    @IsNotEmpty({ message: "O nome não pode estar vazio" })
    name: string;

    @IsEmail({}, { message: "Email inválido" })
    email: string;

    @IsString({ message: "A senha deve ser válida" })
    @IsNotEmpty({ message: "A senha não pode estar vazia" })
    @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    password: string;

    @IsMobilePhone("pt-BR")
    phone: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
}
