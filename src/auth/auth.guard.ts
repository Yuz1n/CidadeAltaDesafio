import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const decoded = this.jwtService.verify(token);
      request.user = { id: decoded.sub, username: decoded.username }; // Decodificando e anexando o ID do usuário
      return true;
    } catch (error) {
      console.error('Invalid token', error);
      return false;
    }
  }
}
