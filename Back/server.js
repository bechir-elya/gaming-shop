import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js";
import forgotPasswordRouter from "./routes/forgotPasswordRoute.js"
import stripeRouter from "./routes/stripe.js";

dotenv.config();

const app = express();

const port = process.env.APP_PORT;

app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(userRouter);
app.use(productRouter);
app.use(forgotPasswordRouter);
app.use(stripeRouter);

connectDB();


app.listen(port, () => {console.log(`http://localhost:${port}`)});
