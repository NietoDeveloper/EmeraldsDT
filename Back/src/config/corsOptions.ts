import { CorsOptions } from 'cors';

const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://emeralddt.com', // Replace with your production domain
    'https://admin.emeralddt.com'
];

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS Architecture'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;