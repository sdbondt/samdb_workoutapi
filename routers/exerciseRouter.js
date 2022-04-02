const express = require('express')
const { createExercise, getExercises, getExercise, deleteExercise } = require('../controllers/exerciseController')
const router = express.Router()

router.post('/', createExercise)
router.get('/', getExercises)
router.get('/:exerciseId', getExercise)
router.delete('/:exerciseId', deleteExercise)

module.exports = router