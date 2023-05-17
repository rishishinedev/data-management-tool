import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const dbURL: any = process.env.DB_URL;
const port: Number = 8080;
console.log(process.env.DB_URL);
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) =>
    console.log('DB connection failed..!', err)
  );

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
