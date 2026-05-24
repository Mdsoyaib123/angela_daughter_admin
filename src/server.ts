import http from "http";
import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/configs";


async function startServer() {
  await mongoose.connect(configs.db_url!);

  const server = http.createServer(app);


  server.listen(configs.port, () => {
    console.log(`🚀 Server running on port ${configs.port}`);
  });
}

startServer();
