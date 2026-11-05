const express = require("express")
const router = express.Router()
const {
    CreateLesson,
    getCourseBYLesson,
    getAllLesson,
    getLessonById,
    updateLessonById,
    deleteLessonById
} = require('../Controller/Lesson')
const {Auth,RoleAuth} = require('../middleware/Auth')


router.get('/lesson-all',getAllLesson)
router.get('/lesson',getCourseBYLesson)
router.get("/lesson/:id",getLessonById)
router.post("/lesson/:courseId",CreateLesson)
router.put("/lesson/:id",updateLessonById)
router.delete("/lesson/:id",deleteLessonById)





module.exports = router;
