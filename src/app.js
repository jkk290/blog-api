require('dotenv').config();
const express = require('express');
const postsRouter = require('./routes/postsRouter');

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', postsRouter);

app.listen(PORT, () => console.log(`App listening on ${PORT}...`));