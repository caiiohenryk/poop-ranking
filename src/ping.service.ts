// ping.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  @Cron('*/10 * * * * ') // A cada 10 minutos
  async handleCron() {
    const url = 'https://poop-app.onrender.com';
    try {
      await axios.get(url);
    } catch (error) {
      this.logger.error(`Erro ao pingar ${url}: ${error.message}`);
    }
  }
}
