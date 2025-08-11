import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createWinstonLoggerConfig } from '../../config/logger.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLoggerService } from './app-logger.service';

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const environment = configService.get<string>('environment');
                const logPath = configService.get<string>('logPath');
                return createWinstonLoggerConfig(environment!, logPath!)
            },
            inject: [ConfigService]
        })
    ],
    providers: [AppLoggerService],
    exports: [WinstonModule, AppLoggerService]
})

export class LoggerModule { }
