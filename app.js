const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser')
var cors = require('cors');
const app = express();
app.use(cors()) ;
app.use(express.static('public/build'));



app.use(express.json());
const port = process.env.PORT || 5000;
app.listen(port,function(){
   console.log(`server listening on port ${port}`); 
});

app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter = require('./Routers/bookingRouter');

   // base route   route to use
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/plans', planRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);
