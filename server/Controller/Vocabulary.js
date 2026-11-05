const vocabularyModel = require('../model/Vocabulary.model')
const lessonModel = require('../model/Lesson.model')


exports.createVocabulary = async(req,res)=>{
 const {word,pinyin,englishMeaning,urduMeaning,partOfSpeech,audio} = req.body
 const {lessonId} = req.params

 const existWord = await vocabularyModel.findOne({word})
 if(existWord){
    return res.status(400).json({
        mess:"This Word Already Exist"
    })
 }
 try{
 const vocabulary = await vocabularyModel.create({
    lessonId,
    word,
    pinyin,
    englishMeaning,
    urduMeaning,
    audio,
    partOfSpeech
 })

 const lesson = await lessonModel.findByIdAndUpdate(lessonId,{
    $push:{vocabulary:vocabulary._id}},
    {new:true}
 )
 res.status(201).json({
    mess:"vocabulary created",
    vocabulary
 })
}catch(error){
    res.status(500).json({
        mess:"seerver err"
    })
    console.log(error);
}
}
exports.getLessonBYVocabulary = async (req, res) => {
    try {
        const {lessonId} =req.query
        const vocabulary = await vocabularyModel.find({ lessonId })
       
        if (!vocabulary) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({ mess: "fetch all Vocabulary ", vocabulary});
        
    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }
}
exports.getVocabularyById = async (req,res)=>{
    try{
        const {id} = req.params
     const vocabulary = await vocabularyModel.findById(id).populate("lessons")
     if (!vocabulary) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
     res.status(200).json({
        mess:"Get All Vocabulary",
        vocabulary
     })
    }catch(error){
  res.status(500).json({
        mess:"seerver err"
    })
    console.log(error);
    }
}
exports.updateVocabulary = async(req,res)=>{
 const {id} = req.params
 const {word,pinyin,englishMeaning,urduMeaning,partOfSpeech,audio} = req.body
try{
 const vocabulary = await vocabularyModel.findByIdAndUpdate(id,
    {word,pinyin,englishMeaning,urduMeaning,partOfSpeech,audio},
    {
        new:true,
        runValidators:true
    }
)
 if (!vocabulary) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({
            mess:"vocabulary Updated"
        })
    }catch(error){
       res.status(500).json({
        mess:"seerver err"
    })
    console.log(error); 
}
}
exports.deleteVocabulary =  async (req,res)=>{
    try{
    const {id} = req.params 
    const vocabulary = await vocabularyModel.findByIdAndDelete(id)
     if (!vocabulary) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({
            mess:"vocabulary Updated"
        })
    }catch(error){
       res.status(500).json({
        mess:"seerver err"
    })
    console.log(error); 
}
}