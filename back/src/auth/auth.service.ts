import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserLoginDto } from "./dto/login-user.dto";
import { User } from "@user/user.model";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async userLogin(dto: UserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: dto.email }
    });
    if (!findUser) return {message: `Email informado não existe.`};
    const compare = await bcrypt.compare(dto.password, findUser.password);
    if (!compare) return {message: `Senha inválida.`}

    const payload = { id: findUser.id, email: dto.email };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}