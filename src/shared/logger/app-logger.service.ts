import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class AppLoggerService implements LoggerService {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: winston.Logger) {}

    log(message: string, context?: string) {this.logger.log(message, context );  }
    error(message: string, trace?: string, context?: string) { this.logger.error(message, { trace, context }); }
    warn(message: string, context?: string) { this.logger.warn(message, { context }); }
    debug(message: string, context?: string) { this.logger.debug(message, { context }); }
    verbose(message: string, context?: string) { this.logger.verbose(message, { context }); }
}
