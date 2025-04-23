import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/user.model';
import { UserController } from '@user/user.controller';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@auth/auth.controller';
import { PoopModule } from '@poop/poop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'poop-api',
      entities: [User],
      synchronize: true // Lembra de mudar pra false quando for pra deploy
    })
    ,UserModule, AuthModule, PoopModule],
  controllers: [UserController, AuthController],
  providers: [],
})
export class AppModule {}
