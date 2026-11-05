const express = require('express')
const router = express.Router()
const {
    createVocabulary,
    getLessonBYVocabulary,
    getVocabularyById,
    updateVocabulary,
    deleteVocabulary
} = require('../Controller/Vocabulary')

router.get('/vocabulary',getLessonBYVocabulary)
router.get('/vocabulary/:id',getVocabularyById)
router.post('/vocabulary/:lessonId',createVocabulary)
router.put('/vocabulary/:id',updateVocabulary)
router.delete('/vocabulary/:id',deleteVocabulary)


module.exports = router;

