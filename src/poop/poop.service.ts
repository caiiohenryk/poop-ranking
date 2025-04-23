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
      .addSelect('COUNT(poop.id)', 'count') // Conta os registros por userId
      .groupBy('poop.userId') // Agrupa por userId
      .orderBy('count', 'DESC') // Ordena do maior para o menor
      .getRawMany(); // Retorna os dados brutos (ex.: [{ userId: "asf214", count: "25" }])
  }
}