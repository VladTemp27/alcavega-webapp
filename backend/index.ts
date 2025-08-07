import express from 'express';
import mongoUtil from './v1/util/mongoUtil';
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2000;

try{
    await mongoUtil.connect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}catch (error) {
    console.error('Error occurred:', error);
    process.exit(1);
}