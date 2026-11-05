const express = require('express')
const router = express.Router()
const {CreateCourse,getCourses,updateCourses,deleteCourses}= require('../Controller/Course')
const {Auth,RoleAuth} = require('../middleware/Auth')

router.get('/course',getCourses)
router.post('/course',CreateCourse)
router.put('/course/:id',updateCourses)
router.delete('/course/:id',deleteCourses)


module.exports = router