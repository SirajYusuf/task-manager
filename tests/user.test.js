const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
jest.setTimeout(30000)


const userOne = {
    name: 'test1',
    email: "sirajvance@gmail.com",
    password:'test1234'
}

beforeEach(async()=>{
   await User.deleteMany()
   await new User(userOne).save()
})


test('should signup a new user',async()=>{
    await request(app).post('/addUser').send({
        name:'Siraj',
        email:'sirajygs@gmail.com',
        password:'sirajygs'
    }).expect(201).timeout(10000)
})

afterAll(async () => { await mongoose.disconnect() })
//hi