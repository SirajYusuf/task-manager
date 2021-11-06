const mongoose = require('mongoose')
const validator = require('validator')


<<<<<<< HEAD

const Task = mongoose.model('Task',{
=======
const taskSchema = new mongoose.Schema({
>>>>>>> lap
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
<<<<<<< HEAD
})


=======
},{
    timestamps: true
})

const Task = mongoose.model('Task',taskSchema)
>>>>>>> lap

module.exports = Task