const request = require('supertest')
const app = require('../src/app')

test('should signup a new user',async()=>{
    await request(app).post('/addUser').send({
        name:'Siraj',
        email:'sirajygs@gmail.com',
        password:'sirajygs'
    }).expect(201)
})

//hi