import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const role = req.user?.role;

        if (role !== 'admin') {
            throw new ForbiddenException('Acesso restrito ao administrador');
        }

        return true;
    }
}
