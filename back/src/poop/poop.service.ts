import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Poop } from "@poop/poop.model";

@Injectable()
export class PoopService {
  constructor(@InjectRepository(Poop) private readonly poopRepository: Repository<Poop>) {}

  async newPoop( userId: string) {
    if (!userId) {
      throw new NotFoundException("Erro ao salvar registro.");
    }
    const newPoop = this.poopRepository.create({
      userId: userId
    });
    return this.poopRepository.save(newPoop);
  }

  async clear(poopId: string) {
    try {
      await this.poopRepository.delete(poopId);
    } catch (error) {
      throw new NotFoundException("Erro ao salvar registro.");
    }
    return true;
  }

  async getRanking() {
    return this.poopRepository
      .createQueryBuilder('poop')
      .select('poop.userId', 'userId')
      .addSelect('user.nome', 'nome') // Adiciona o nome do usuário
      .addSelect('COUNT(poop.id)', 'count')
      .innerJoin('user', 'user', 'user.id = poop.userId') // Faz o JOIN com a tabela de usuários
      .groupBy('poop.userId, user.nome') // Agrupa também pelo nome
      .orderBy('count', 'DESC')
      .getRawMany();
  }

  async buscarTodos(userId: string) {
    try {
      return await this.poopRepository.find({
        where: { userId: userId }
      });
    } catch (error) {
      console.error(error.message);
      throw new NotFoundException("Erro ao buscar cagadas.");
    }
  }
}