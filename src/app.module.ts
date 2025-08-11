import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './shared/logger/logger.module';
import { AppLoggerService } from './shared/logger/app-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [appConfig]
    }),
    LoggerModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService, AppLoggerService],
})

export class AppModule {
  
}
