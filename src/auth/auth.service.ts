import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/users/user.service";
import { HashingService } from "src/common/hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import { JWTPayload } from "./types/jwt-payload-type";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
    ) { }
    async doLogin(loginDto: LoginDto) {
        //email -> Repositorio | UserService
        //HashingService
        //JWTService
        const user = await this.userService.findByEmail(loginDto.email);
        const isPassword = await this.hashingService.compare(loginDto.password, user?.password || '');
        if (!user || !isPassword) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        const jwtPayload: JWTPayload = { sub: user.id, email: user.email };
        const access_token = await this.jwtService.signAsync(jwtPayload);
        user.forceLogout = false;
        await this.userService.save(user);
        return { access_token };
    }
}
