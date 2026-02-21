// Auora;
import express, { json } from "express";
import connectToDb from "./src/connectToDb/connectToDb.js";
import cors from "cors";
import userRouter from "./src/Routes/userRouter.js";

const app = express();
app.use(cors());

app.listen(8000, () => {
  console.log("App is listening at 8000");
  connectToDb();
});
app.use(express.static("public"));

app.use(json());

app.use("/user", userRouter);
