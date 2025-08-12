require('dotenv').config();
const express = require('express');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`App listening on ${PORT}...`));