import express from 'express';
import cors from 'cors';
import { sendCodeRouter, verifyCodeRouter, checkUniqueEmail } from './emailVerification.js';
import { handleRegisterRouter } from './registration.js';
import { searchRouter } from './search.js';

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/', sendCodeRouter);
app.use('/', verifyCodeRouter);
app.use('/', handleRegisterRouter);
app.use('/', checkUniqueEmail);
app.use('/', searchRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
