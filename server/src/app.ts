import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from 'express';
import userRouter from './routes/userRoutes';
import cors from 'cors';
// Boot express
const app: Application = express();

app.use(cors({
  origin: '*'
}));
app.use('/api/v1/users', userRouter);

export default app;
