import app from "./app";

const port: Number = 8080;

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
