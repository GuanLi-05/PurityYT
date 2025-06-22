import express from 'express';
import cors from 'cors';

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

app.get('/', (req, res) => {
    res.send('send');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
