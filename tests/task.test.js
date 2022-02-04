const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const mongoose = require('mongoose')
const {userOne,
       userOneId,
       userTwo,
       taskOne,
       setupDatabase,
       connectDb,
       disconnectDb
} = require('./fixtures/db')

beforeAll(connectDb)

beforeEach(setupDatabase)


test('Should create a task for user',async()=>{
    const response = await request(app)
        .post('/addTask')
        .set('Authorization',userOne.tokens[0].token)
        .send({
            description: 'from my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get tasks of users',async()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization',userOne.tokens[0].token)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('hould not delete the other users tasks',async()=>{
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization',userTwo.tokens[0].token)
        .expect(400)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

afterAll(disconnectDb)
