const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();


app.use(express.json());
app.listen(3000);

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter')
   // base route   route to use
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/plans', planRouter);
