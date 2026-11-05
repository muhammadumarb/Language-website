const courseModel = require("../model/Course.model")



exports.CreateCourse = async(req,res)=>{
    const {title,language,description,level} =req.body 

    const checkedTitle = await courseModel.findOne({title})
    if(checkedTitle){
        return res.status(401).json({
            mess:"Title is Already exist"
        })
    }
    try{
    const course = await courseModel.create({
        title,
        language,
        description,
        level
    })
    res.status(201).json({
        mess:"Course created Succesfull",
        course
    })
}catch(error){
    res.status(500).json({
        mess:"server error",
    })
    console.log(error);
    
}
    
}
exports.getCourses = async (req,res)=>{
    try{
        const course = await courseModel.find().populate({
        path: "lessons",
        select: "title ,description",
    
      });
    res.status(200).json({
        mess:"fetch All Course",
        course
    })
}catch(error){
    res.status(500).json({
        mess:"server error",
    })
    console.log(error);
}

}
exports.updateCourses = async (req,res)=>{

    const {id}= req.params
     const {title,language,description,level} =req.body 
try{

    const course = await courseModel.findByIdAndUpdate(id,
        {title,language,description,level},
        {
            new:true,
            runValidators:true
        }
    )
    if(!course){
        return res.status(404).json({
            mess:"Cousrse not found"
        })
    }
    res.status(200).json({
        mess:"Course Updated"
    })
}catch(error){
 res.status(500).json({
        mess:"server error",
    })
    console.log(error);   
}

    
}
exports.deleteCourses = async (req,res)=>{
    const {id} = req.params

    const course = await courseModel.findByIdAndDelete(id)

  if(!course){
        return res.status(404).json({
            mess:"Cousrse not found"
        })   
}
  res.status(200).json({
    mess:"course Deleted"
  })

}