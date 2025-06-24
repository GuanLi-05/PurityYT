import express from 'express';
import cors from 'cors';
import { sendCodeRouter, verifyCodeRouter } from './emailVerification.js';

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('send');
});

app.use('/', sendCodeRouter);
app.use('/', verifyCodeRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
