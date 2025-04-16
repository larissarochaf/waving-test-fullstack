import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    if (email === 'admin@teste.com' && password === 'admin123') {
      return { success: true, email };
    } else {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
