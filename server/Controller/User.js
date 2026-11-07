const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DTO = require('../DTO/RegisterDto');
const access = u => jwt.sign({id:u._id,role:u.role},process.env.Access_TOKEN,{expiresIn:'15m'});
const refresh = u => jwt.sign({id:u._id,role:u.role},process.env.REFRESH_TOKEN,{expiresIn:'7d'});
const cookie = (res,token) => res.cookie('refreshToken',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'lax',path:'/',maxAge:7*86400000});
exports.createAccount = async (req,res) => {
 try {
  const {name,email,password}=req.body;
  if(!name?.trim()||!email?.trim()||!password||password.length<6) return res.status(400).json({mess:'Name, email and password (minimum 6 characters) are required.'});
  const normalized=email.trim().toLowerCase();
  if(await User.findOne({email:normalized})) return res.status(409).json({mess:'An account with this email already exists.'});
  const user=await User.create({name:name.trim(),email:normalized,password:await bcrypt.hash(password,10)});
  cookie(res,refresh(user));
  return res.status(201).json({mess:'Account created',user:new DTO(user),accessToken:access(user)});
 } catch(e){console.error('Register:',e);return res.status(500).json({mess:'Registration failed. Check server logs and MongoDB connection.'});}
};
exports.loginAccount = async (req,res) => {
 try {
  const {email,password}=req.body;
  if(!email||!password)return res.status(400).json({mess:'Email and password are required.'});
  const user=await User.findOne({email:email.trim().toLowerCase()});
  if(!user||!(await bcrypt.compare(password,user.password)))return res.status(401).json({mess:'Invalid email or password.'});
  cookie(res,refresh(user));return res.json({mess:'Login successful',user:new DTO(user),accessToken:access(user)});
 }catch(e){console.error('Login:',e);return res.status(500).json({mess:'Login failed.'});}
};
exports.RefreshToken = async(req,res)=>{try{const t=req.cookies?.refreshToken;if(!t)return res.status(401).json({mess:'Session expired'});const d=jwt.verify(t,process.env.REFRESH_TOKEN);const u=await User.findById(d.id);if(!u)return res.status(401).json({mess:'User not found'});cookie(res,refresh(u));return res.json({user:new DTO(u),accessToken:access(u)});}catch{return res.status(401).json({mess:'Session expired'});}};
exports.LogOut = (req,res)=>{res.clearCookie('refreshToken',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'lax',path:'/'});return res.json({mess:'Logged out'});};
