
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
// import mongoose from 'mongoose';

import Connection from './database/db.js';
import Routes from './routes/route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use('/api', Routes); // Prefixing API routes with /api

// Server setup
const PORT = process.env.PORT || 8000;

Connection();

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
