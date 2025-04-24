import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/user.model';
import { UserController } from '@user/user.controller';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from '@auth/auth.controller';
import { PoopModule } from '@poop/poop.module';
import { Poop } from "@poop/poop.model";
import { PoopController } from "@poop/poop.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Poop],
        synchronize: true, // Apenas para desenvolvimento!
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    PoopModule
  ],
  controllers: [UserController, AuthController, PoopController],
  providers: [],
})
export class AppModule {}