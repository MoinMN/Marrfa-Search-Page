import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4518;

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// database connection here 
import connectDB from './config/MongoDB.js';
connectDB();

// import routes
import BlogRoutes from './routes/blog.route.js';

// use routes
app.use('/blog', BlogRoutes);

app.listen(PORT, () => console.log(`Backend Running http://localhost:${PORT}`));