const { StatusCodes } = require("http-status-codes")
const asyncHandler = require("../errorHandlers/asyncHandler")
const CustomError = require("../errorHandlers/customError")
const Exercise = require("../models/Exercise")
const validate = require('../utils/validateExerciseInput')

exports.createExercise = asyncHandler(async (req, res) => {
    const body = validate(req.body)
    body.user = req.user._id
    const exercise = await Exercise.create(body)
    res.status(StatusCodes.CREATED).json({
        data: {
            exercise
        }
    })
})

exports.getExercise = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params

    const exercise = await Exercise.findOne({
        _id: exerciseId,
        user: req.user._id
    })
    if (!exercise) {
        throw new CustomError('No exercise found for this id.', StatusCodes.BAD_REQUEST)
    } else {
        res.status(StatusCodes.OK).json({
            data: {
                exercise
            }
        })
    }
})

exports.getExercises = asyncHandler(async (req, res) => {
    let { q, page, limit, direction } = req.query
    direction = direction !== 'asc' ? '-createdAt' : 'createdAt'
    const queryObj = {}
    if (q) {
        queryObj['$or'] = [{type: { $regex: q}}, { name: { $regex: q} }]
    }
    
    page = Number(page) || 1
    limit = Number(limit) || 10
    const skip = (page - 1) * limit

    const exercises = await Exercise.find(queryObj).sort(direction).skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({
        data: {
            exercises
        }
    })
})


exports.deleteExercise = asyncHandler(async (req, res) => {
    const { exerciseId } = req.params
    const exercise = await Exercise.findOne({
        _id: exerciseId,
        user: req.user._id
    })

    if (!exercise) {
        throw new CustomError('No exercise found for this id.', StatusCodes.BAD_REQUEST)
    } else {
        await exercise.remove()
        res.status(StatusCodes.OK).json({
            data: {
                exercise
            }
        })
    }
    
})