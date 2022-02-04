const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {userOne,userOneId,setupDatabase, connectDb, disconnectDb} = require('./fixtures/db')

beforeAll(connectDb)

beforeEach(setupDatabase)


test('should signup a new user',async()=>{
   const response =  await request(app).post('/addUser').send({
        name:'Siraj',
        email:'sirajygs@gmail.com',
        password:'sirajygs'
    }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name:"Siraj",
            email:"sirajygs@gmail.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('sirajygs')
})

test('Should login existing user',async()=>{
    const response = await request(app).post('/users/login')
    .send({
        email:userOne.email,
        password:userOne.password
    })
    .expect(200)

    const user = await User.findOne(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login existing user',async()=>{
    await request(app).post('/users/login').send({
        email:'user@gmail.com',
        password:'user1234'
    }).expect(400)
})

test("Should get profile for user",async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',userOne.tokens[0].token)
    .send()
    .expect(200)
})

test("Should get profile for user",async()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test("Should delete account for user",async()=>{
   const response = await request(app)
    .delete('/users/me')
    .set('Authorization',userOne.tokens[0].token)
    .send()
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should not delete account for user",async()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test("Should upload avatar image",async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',userOne.tokens[0].token)
    .attach('avatar','tests/fixtures/profile-pic.jpg')
    .expect(200)
    const user = await User.findOne(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid user fields",async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',userOne.tokens[0].token)
    .send({
        email:'testing@gmail.com'
    })
    .expect(200)
    const user = await User.findOne(userOneId)
    expect(user.email).toBe('testing@gmail.com')
})

test("Should not update invalid user fields",async()=>{
   const response = await request(app)
    .patch('/users/me')
    .set('Authorization',userOne.tokens[0].token)
    .send({
        location:'los vegas'
    })
    .expect(400)
})

afterAll(disconnectDb)

//https://gist.github.com/andrewjmead/988d5965c609a641202600b073e54266
//^visit this link for more test ideas