import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from './routes/userRoutes';
// Boot express
const app: Application = express();

app.use('/api/v1/users', userRouter);

export default app;
