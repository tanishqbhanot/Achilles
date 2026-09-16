import { env } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

startServer();