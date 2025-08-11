import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const createWinstonLoggerConfig = (env: string, logPath: string): WinstonModuleOptions => {

    const isDevelopment = env === 'development';

    const baseFormat = winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp, context, trace, ...rest }) => {
            let logMessage = `${timestamp} [${level}]`;

            if (context) {
                logMessage += ` [${context}]`;
            }

            logMessage += `: ${message}`;

            if (trace) {
                logMessage += `\nStack trace:\n${trace}`;
            }

            const restKeys = Object.keys(rest);
            if (restKeys.length > 0) {
                logMessage += `\nMetadata: ${JSON.stringify(rest, null, 2)}`;
            }

            return logMessage;
        }),
    );


    const transports: winston.transport[] = [];

    // Transport pour les erreurs critiques et les logs généraux en production
    if (!isDevelopment) {
        // Log des erreurs pour la surveillance
        transports.push(
            new winston.transports.DailyRotateFile({
                dirname: `${logPath}/errors`,
                filename: '%DATE%.error.log', // Nom de fichier plus explicite
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxFiles: '30d',
                level: 'error',
            }),
        );

        // Log des requêtes et informations générales
        transports.push(
            new winston.transports.DailyRotateFile({
                dirname: `${logPath}/info`,
                filename: '%DATE%.info.log', // Nom de fichier plus explicite
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxFiles: '14d',
                level: 'info',
            }),
        );
    }

    // Transport pour le développement ou en complément pour les environnements de staging
    if (isDevelopment || env === 'staging') {
        transports.push(
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize(),
                    baseFormat
                ),
            }),
        );
    }

    return {
        level: isDevelopment ? 'debug' : 'info',
        format: baseFormat,
        transports,
    };

}