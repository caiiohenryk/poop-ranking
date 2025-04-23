import { Module } from '@nestjs/common';
import { Poop } from "@poop/poop.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Poop])],
  exports: []
})
export class PoopModule {}
