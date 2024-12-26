import express from 'express';
import {connectDB} from './config/db.js';
import User from './models/users.model.js';

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    connectDB();
    res.status(200).send('Hello World');
})

app.post('/user/', async (req, res) => {
    const {name, password, isAdmin} = req.body;
    const user = new User({
        name,
        password,
        isAdmin
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

app.listen(8080, async () => {
    await connectDB();
    console.log('Server started on http://localhost:8080');
});
