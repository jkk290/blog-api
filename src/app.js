require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./auth/passport');
const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passportConfig();
app.use(passport.initialize());


app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`App listening on ${PORT}...`));