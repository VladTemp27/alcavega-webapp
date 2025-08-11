import express from 'express';
import mongoUtil from './v1/util/mongoUtil.js';
const app = express();
app.use(express.json());

import v1Router from './v1/v1Router.js';

const PORT = process.env.PORT || 2000;

app.use('/api/v1', v1Router);

try{
    await mongoUtil.connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
}