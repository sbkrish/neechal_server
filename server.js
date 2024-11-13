import fs from 'fs';
import https from 'https';
import http from 'http';  // Import http for local server
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
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure you're logging the port
console.log(`Server running on port: ${process.env.PORT || port}`);

// Sync all models with the database
await sequelize.sync();

// Body parser for POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

app.use("/api/students", registrationLimiter, students);
app.use("/api/newsletter", newsletterLimiter, newsletter);

// Display error for incorrect non-existing URLs
app.use(notFound);

// Error middleware
app.use(errorHandler);

// Check if the environment is production to use HTTPS
if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.neechal.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/api.neechal.com/fullchain.pem', 'utf8');
    
    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(port, () => {
        console.log(`HTTPS server running on https://localhost:${port}`);
    });
} else {
    // If not production, run HTTP server for local development
    http.createServer(app).listen(port, () => {
        console.log(`HTTP server running on http://localhost:${port}`);
    });
}
