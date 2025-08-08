require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.APP_PORT;


app.get('/', (req, res) => res.send('Hello world!'));

app.listen(PORT, () => console.log(`App listening on ${PORT}...`));