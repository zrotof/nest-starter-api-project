import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whiteList = [
    'http://localhost:4200',
];

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};