import { ConflictException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashingService } from "src/common/hashing/hashing.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) { }
    async create(dto: CreateUserDto) {
        const existsEmail = await this.userRepository.exists({ where: { email: dto.email } });
        const existsPhone = await this.userRepository.exists({ where: { phone: dto.phone } });

        if (existsEmail || existsPhone) {
            throw new ConflictException("Email ou telefone já cadastrado");
        }

        const hashedPassword = await this.hashingService.hash(dto.password);


        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            password: hashedPassword,
            avatarUrl: dto.avatarUrl,
        });


        const savedUser = await this.userRepository.save(user);
        const check = await this.userRepository.findOneBy({ id: savedUser.id });
        console.log('CHECK NO MESMO BD:', check);

        console.log("DEBUG BACKEND - Usuário salvo:", savedUser);

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            avatarUrl: savedUser.avatarUrl,
            createdAt: savedUser.createdAt,

        };
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
        });
    }

    findByID(id: string) {
        return this.userRepository.findOneBy({ id });
    }

    save(user: User) {
        return this.userRepository.save(user);
    }
}
