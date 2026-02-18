import dotenv from "dotenv";
dotenv.config();

import { App } from "./config/app";
import { connectToDb } from "./database/connection";

const Port = process.env.PORT || 5050;
async function start() {
  await connectToDb();

  const appInstance = new App();

  appInstance.app.listen(Port, () => {
    console.log(`App is listening at ${Port}`);
  });
}

start();
