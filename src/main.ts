// main
import express from "express";
import productRouter from "./router/productRouter";
import categoryRouter from "./router/categoryRouter";
import userRouter from "./router/userRouter";
import orderRouter from "./router/orderRouter";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(cookieParser());
console.log("this is the cookie parser",app.use(cookieParser()))
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log("you are in server Port no:", PORT);
});
