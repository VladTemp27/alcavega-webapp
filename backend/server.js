import express from 'express';
import {connectDB} from './config/db.js';
import userRoutes from './routes/user-routes.js';
import authRoutes from './services/auth/auth-routes.js';
const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send('Hello World');
})

app.use('/auth', authRoutes);
app.use('/api/user-service', userRoutes);

app.listen(8080, async () => {
    await connectDB();
    console.log('Server started on http://localhost:8080');
});
