import express from 'express';
import cors from 'cors';
import { sendCodeRouter, verifyCodeRouter } from './emailVerification.js';
import { handleRegisterRouter } from './registration.js';

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', sendCodeRouter);
app.use('/', verifyCodeRouter);
app.use('/', handleRegisterRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
