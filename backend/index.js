// Auora;
import express, { json } from "express";
import connectToDb from "./src/connectToDb/connectToDb.js";
import productRouter from "./src/route/productRouter.js";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(8000, () => {
  console.log("App is listening at 8000");
  connectToDb();
});
app.use(express.static("public"));

app.use(json());

app.use("/product", productRouter);
