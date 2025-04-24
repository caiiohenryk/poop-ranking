import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // Registrar usuário
  async registrarUsuario(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {email: dto.email}
    });
    if (existingUser) throw new ConflictException('Email já existente');
    // Encripta a senha usando a lib bcrypt
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      nome: dto.nome,
      email: dto.email,
      password: hashPassword,
    });
    return this.userRepository.save(newUser);
  }

  // Get Usuario
  async getUser(userId: string) {
    const findUser = await this.userRepository.findOne({
      where: { id: userId }
    });
    if (!findUser) throw new NotFoundException(`Usuario de id ${userId} não encontrado.`);
    return findUser;
  }

}