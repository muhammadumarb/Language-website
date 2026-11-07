require('dotenv').config();
const express=require('express'),cookieParser=require('cookie-parser'),cors=require('cors');
const connectDB=require('./Confiq/Db');
const app=express();
app.use(cors({
  origin: 'https://language-web-umar-bhatti.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());app.use(express.urlencoded({extended:true}));app.use(cookieParser());
app.use('/api/auth',require('./Router/User.router'));
app.use('/api/course',require('./Router/Course.router'));
app.use('/api/lesson',require('./Router/Lesson.router'));
app.use('/api/vocabulary',require('./Router/Vocabulary.router'));
app.get('/api/health',(_,res)=>res.json({status:'ok',name:'LingoPath API'}));
const port=process.env.PORT||5000;
connectDB().then(()=>app.listen(port,()=>console.log(`LingoPath API running on ${port}`)));
