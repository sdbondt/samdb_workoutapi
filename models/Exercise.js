const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ExerciseSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be provided'] 
    },
    type: {
        type: String,
        enum: ['cardio', 'strength', 'agility'],
        required: [true, 'You must add the type of your exercise.']
    },
    name: {
        type: String,
        enum: ['swimming', 'running', 'cycling', 'bench press', 'quad press', 'push press', 'lateral shuffle', 'shuttle run', 'l drill'],
        required: [true, 'You must add the name of your exercise']
    },
    duration: {
        type: Number,
        required: [true, 'You must the duration of your exercise'],
        min: [0, 'Duration must be larger than zero.']
    },
    distance: {
        type: Number,
        min: [0, 'Distance must be larger than zero.']
    },
    weight: {
        type: Number,
        min: [0, 'Weight must be larger than zero.']
    },
    sets: {
        type: Number,
        min: [0, 'Sets must be larger than zero.']
    },
    reps: {
        type: Number,
        min: [0, 'Reps must be larger than zero.']
    }

}, {
    timestamps: true
})

ExerciseSchema.statics.setDuration = async function (operator, userId, duration) {
    const val = operator === '+' ? duration : -duration
    try {
        await this.model('User').findByIdAndUpdate(userId, {
           $inc: { duration: val}
        })
    } catch (e) {
        console.log(e)
    }
}

ExerciseSchema.post('save', async function () {
    await this.constructor.setDuration('+', this.user, this.duration)
})

ExerciseSchema.pre('remove', async function () {
    await this.constructor.setDuration('-', this.user, this.duration)
})

const Exercise = model('Exercise', ExerciseSchema)
module.exports = Exercise