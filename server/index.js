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

// Use Render's provided port or default to 5000
const port = process.env.PORT || 5000;

const app = express();

// Enhanced logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('origin') || 'no origin'}`);
  next();
});

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

// Proper server setup with error handling
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`SERVER RUNNING on PORT=${port}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
