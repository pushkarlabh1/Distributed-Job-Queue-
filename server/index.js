import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";
import cors from 'cors';
import corsConfig from './cors-config.js';

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors(corsConfig.corsOptions));
app.options('*', cors(corsConfig.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

// Root route for health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running", time: new Date().toISOString() });
});

app.get("/health", (req, res) => {
  res.send("OK");
});


app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`SERVER RUNNING on PORT=${port}`));
