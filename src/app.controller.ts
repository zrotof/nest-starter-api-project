import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLoggerService } from './shared/logger/app-logger.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly logger: AppLoggerService,) {}

  @Get()
  getHello(): string {
    this.logger.log('hello', 'test')
    return this.appService.getHello();
  }
}