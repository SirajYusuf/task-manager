const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('db connection was successful')
}).catch((e) => {
    console.log('error: ' + e)
})


// const tasks = new Task({
//     description: 'Servicing the car',
//     completed: true
// })

// tasks.save().then((Task) => {
//     console.log(Task)
// }).catch((error) => {
//     console.log(error)
// })

//validation
//sanitation - to alter the data (if needed) before saving it.


// //creating instance of that model
// const me = new User({
//     name: '  Andrew  ',
//     email: 'MYEMAIL@MEAD.IO     ',
//     password: 'phone098'
// })

// //saving this to database and printing to console
// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!',error)
// })

// challenge