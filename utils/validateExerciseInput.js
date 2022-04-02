const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errorHandlers/customError')

const validate = (body) => {
    if (body.type === 'cardio' && !body.distance) {
        throw new CustomError('You must add a distance for your cardio exercise.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'strength' && (!body.weight || !body.sets || !body.reps)) {
        throw new CustomError('You must add a weight, sets and reps for your strength exercise.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'agility' && (!body.sets || !body.reps)) {
        throw new CustomError('You must add sets and reps for your agility exercise.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'cardio' && body.name !== 'swimming' && body.name !== 'running' && body.name !== 'cycling') {
        throw new CustomError('Cardio exercises can only be swimming, running or cycling.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'strength' && body.name !== 'bench press' && body.name !== 'quad press' && body.name !== 'push press') {
        throw new CustomError('Strength exercises can only be bench, quad or push press.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'agility' && body.name !== 'lateral shuffle' && body.name !== 'shuttle run' && body.name !== 'l drill') {
        throw new CustomError('Agility exercises can only be lateral shuffle, shuttle run or L-drill.', StatusCodes.BAD_REQUEST)
    }

    if (body.type === 'cardio' && body.distance) {
        return {
            distance: body.distance,
            type: body.type,
            name: body.name,
            duration: body.duration
        }
    }

    if (body.type === 'strength' && body.weight && body.sets && body.reps) {
        return {
            type: body.type,
            name: body.name,
            duration: body.duration,
            weight: body.weight,
            sets: body.sets,
            reps: body.reps
        }
    }

    if (body.type === 'agility' && body.sets && body.reps) {
        return {
            type: body.type,
            name: body.name,
            duration: body.duration,
            sets: body.sets,
            reps: body.reps
        }
    }
}

module.exports = validate