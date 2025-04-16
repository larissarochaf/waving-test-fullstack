import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaClient } from '@prisma/client';
  import * as bcrypt from 'bcrypt';
  
  const prisma = new PrismaClient();
  
  @Controller('auth')
  export class AuthController {
    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
      const { email, password } = body;
  
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new UnauthorizedException('E-mail já cadastrado');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
  
      return { success: true, id: user.id, email: user.email };
    }
  
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      const { email, password } = body;
  
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new UnauthorizedException('Senha incorreta');
      }
  
      return { success: true, id: user.id, email: user.email };
    }
  }
  