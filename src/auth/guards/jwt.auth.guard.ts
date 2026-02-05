import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        //context: ExecutionContext,
        //status?: any,
    ): TUser {
        if (err) throw err;

        const isJwtError =
            info?.name === 'JsonWebTokenError' ||
            info?.name === 'TokenExpiredError' ||
            info?.name === 'NotBeforeError';

        if (!user || isJwtError) {
            throw new UnauthorizedException('Você precisa fazer login');
        }

        return user;
    }
}
