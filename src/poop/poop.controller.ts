import { Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PoopService } from "@poop/poop.service";
import { AuthGuard } from "@auth/guards/auth.guard";

@Controller('poop')
export class PoopController {
  constructor(private readonly poopService: PoopService) {}

  @Post(':userId')
  @UseGuards(AuthGuard)
  async post(@Param('userId') userId: string) {
    const poop = await this.poopService.newPoop(userId);
    return { message: 'Criado com sucesso!' }
  }

  @Delete(':poopId')
  @UseGuards(AuthGuard)
  async delete(@Param('poopId') poopId: string) {
    await this.poopService.clear(poopId);
    return { message: 'Deletado com sucesso!' }
  }

  @Get('ranking')
  async getRanking() {
    return this.poopService.getRanking();
  }

}