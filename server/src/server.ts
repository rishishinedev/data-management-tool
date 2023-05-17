import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const dbURL: any = process.env.DB_URL;
const port: Number = 8080;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) =>
    console.log('DB connection failed..!', err)
  );

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
