import { Module } from '@nestjs/common';
import { Poop } from "@poop/poop.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PoopService } from "@poop/poop.service";

@Module({
  imports: [TypeOrmModule.forFeature([Poop])],
  exports: [ PoopService],
  providers: [PoopService],
})
export class PoopModule {}
