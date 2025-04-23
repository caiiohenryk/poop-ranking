import { Body, Controller,  Get,  NotFoundException, Post, UseGuards } from "@nestjs/common";
import { UserLoginDto } from "./dto/login-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {};

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    const payload = await this.authService.userLogin(loginDto);
    if (!payload.accessToken) throw new NotFoundException(payload.message);
    return {
      accessToken: payload.accessToken,
      message: `Login com sucesso.`
    }
  }
}