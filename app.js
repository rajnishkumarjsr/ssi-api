import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import healthRoutes from './src/routes/health_check.js';
import login from './src/routes/login.js';
import register from './src/routes/register.js';
import verify from './src/routes/verify.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/login', login);
app.use('/register', register);
app.use('/verify', verify);
/*
 * 404 - Route Not Found
 */
app.use((req, res, next) => {
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

/*
 * Centralized Error Handler
 */
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

export default app;