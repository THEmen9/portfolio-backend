import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import aboutRoutes from './routes/about.js';
import adminRoutes from './routes/admin.js'


const app = express();

// --------middlewares----------//
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());

//-----------------------Routes---------------------------//

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/admin', adminRoutes);



app.listen(5000, () => {
  console.log('Server running on port 5000');
});