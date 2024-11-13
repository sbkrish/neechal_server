import fs from 'fs';
import https from 'https';
import express from "express";
import logger from "./middleware/logger.js";
import path from "path";
import cors from 'cors';
import sequelize from './database.js';
import errorHandler, { notFound } from "./middleware/error.js";
import { fileURLToPath } from "url";
import students from "./routes/students.js";
import newsletter from './routes/newsletter.js'
import registrationLimiter, { newsletterLimiter } from "./middleware/rateLimit.js";

// Load environment variables from .env file
const port = process.env.PORT || 8000;

const app = express();
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(process.env.PORT);

// Sync all models with the database
await sequelize.sync();

//body parser for post request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

app.use("/api/students", registrationLimiter, students);
app.use("/api/newsletter", newsletterLimiter, newsletter);

//display error for incorrect non existing url
app.use(notFound);
//error middleware

app.use(errorHandler);

app.listen(port, () => console.log(`working server on port ${port}`));
