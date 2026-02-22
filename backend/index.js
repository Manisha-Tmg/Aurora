// Auora;
import express, { json } from "express";
import connectToDb from "./src/connectToDb/connectToDb.js";
import cors from "cors";
import userRouter from "./src/Routes/userRouter.js";
import fileRouter from "./src/controllers/fileRouter.js";
import pageNotFound from "./src/middleware/pageNotFound.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

const app = express();
app.use(cors());

app.listen(8000, () => {
  console.log("App is listening at 8000");
  connectToDb();
});
app.use(express.static("public"));

app.use(json());

app.use("/user", userRouter);
app.use("/file", fileRouter);

// url middleware
app.use("/", pageNotFound);

// error middleware
app.use(errorMiddleware);
