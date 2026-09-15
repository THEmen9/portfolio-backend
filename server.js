import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// db import
import connectDB from './conf/db.js';

// routes import 
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import aboutRoutes from './routes/about.js';
import adminRoutes from './routes/admin.js'

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-psi-lyart-anwnqsqcdm.vercel.app"
];

// --------middlewares----------//
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());

//-----------------------Routes---------------------------//

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/admin', adminRoutes);



connectDB().then(() => {
  app.listen(PORT, () => console.log("Server running"));
});