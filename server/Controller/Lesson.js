const lessonModel = require("../model/Lesson.model")
const courseModel = require('../model/Course.model')



exports.CreateLesson = async (req, res) => {
    const { title, titleUrdu, description, order,level } = req.body
    const { courseId } = req.params
    const checkTitle = await lessonModel.findOne({ title })
    if (checkTitle) {
        return res.status(400).json({
            mess: "Title is Already Exist"
        })
    }
    try {

        const lesson = await lessonModel.create({
            courseId,
            title,
            titleUrdu,
            description,
            order,
            level
        })
        const course = await courseModel.findByIdAndUpdate(
            courseId,
             { $push: { lessons: lesson._id }},
            { new: true },
        
        )
    console.log("Updated course:", course);
        res.status(201).json({
            mess: "lesson create Successfull",
            lesson
        })
    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);

    }
}
exports.getCourseBYLesson = async (req, res) => {
    try {
        const {courseId} =req.query
        const lessons = await lessonModel.find({ courseId }).sort({ order: 1 })
       
        if (!lessons) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({ mess: "fetch all lessons", lessons });
        
    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }
}
exports.getAllLesson = async (req, res) => {
    try {
     
        const lesson = await lessonModel.find().populate({
        path: "vocabulary",
        select: "word ,englishMeaning",
    
      });;
        if (!lesson) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({
            mess: "get All lesson fetched",
            lesson
        })

    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }

}

exports.getLessonById = async (req, res) => {
    try {
        const { id } = req.params
        const lesson = await lessonModel.findById(id).populate("courseId", "title language").populate("vocabulary");
        if (!lesson) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        res.status(200).json({
            mess: "",
            lesson
        })

    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }

}
exports.updateLessonById = async (req, res) => {
    const { title, titleUrdu, description, order } = req.body
    const { id } = req.params
    try {
        const lesson = await lessonModel.findByIdAndUpdate(id, {
            title, titleUrdu, description, order
        },
            {
                new: true,
                runValidators: true
            }
        )
        if (!lesson) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }

        res.status(200).json({
            mess: "lesson updated"
        })

    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }
}
exports.deleteLessonById = async (req, res) => {
    try {
        const { id } = req.params
        const lesson = await lessonModel.findByIdAndDelete(id)
        if (!lesson) {
            return res.status(404).json({
                mess: "lesson not found"
            })
        }
        await courseModel.findByIdAndUpdate(
            lesson.courseId,
            { $pull: { lessons: lesson._id } }
        );
        res.status(200).json({
            mess: "lesson Deleted"
        })

    } catch (error) {
        res.status(500).json({
            mess: "server error"
        })
        console.log(error);
    }
}

