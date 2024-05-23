import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import listingRouter from'./routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

mongoose.connect(process.env.mongo).then(()=>{
    console.log("connected to mongo");
 }).catch((err)=>{
    console.log(err.message);
  }
);

const __dirname= path.resolve();
         

const app= express();
app.use(express.json());
app.use(cookieParser());
//get info form cookie
// pp.use(cookieParser());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);
//making an error handler middleware that always works
app.use(express.static( path.join(__dirname ,'/client/dist') ))
// any url that is not above url go to our index.html inside dist folder
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'client', 'dist','index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000,()=>{
  console.log("conected");
});