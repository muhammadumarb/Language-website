const mongoose=require('mongoose');
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},lessonId:{type:mongoose.Schema.Types.ObjectId,ref:'lessons',required:true},score:{type:Number,min:0,max:100,required:true},completed:{type:Boolean,default:false},xpEarned:{type:Number,default:0},completedAt:Date},{timestamps:true});
schema.index({userId:1,lessonId:1},{unique:true});
module.exports=mongoose.model('progress',schema);
