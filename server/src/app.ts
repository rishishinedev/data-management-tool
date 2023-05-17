import express, { Application } from 'express';
import userRouter from './routes/userRoutes';
import cors from 'cors';

const app: Application = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use('/api/v1/users', userRouter);

app.use(
  (err: any, req: any, res: any, next: any) => {
    res.status(400).json({ error: err.message });
  }
);
export default app;
