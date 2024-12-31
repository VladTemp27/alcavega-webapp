import express from 'express';
import {connectDB} from './config/db.js';
import userRoutes from './routes/user-routes.js';
import authRoutes from './services/auth/auth-routes.js';
import authenticateToken from './services/auth/auth-middleware.js';
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: '*' }))

app.get('/', async (req, res) => {
    res.status(200).send('Hello World');
})

app.use('/auth', authRoutes);
app.use('/api/user-service', authenticateToken(true),userRoutes);

app.listen(8080, async () => {
    await connectDB();
    console.log('Server started on http://localhost:8080');
});
