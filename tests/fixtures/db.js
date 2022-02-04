const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Task = require('../../src/models/task')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name: 'test1',
    email: "sirajvance@gmail.com",
    password:'test1234',
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name: 'test2',
    email: "test2@gmail.com",
    password:'test1234',
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.SECRET)
    }]
}

const connectDb  = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL)
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description:'First task',
    completed:false,
    owner:userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description:'second task',
    completed:true,
    owner:userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description:'third task',
    completed:true,
    owner:userTwoId
}

const setupDatabase = async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

const disconnectDb = async()=>{
    await mongoose.disconnect() 
}
module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    connectDb,
    disconnectDb,
    taskOne,
    userTwo
}