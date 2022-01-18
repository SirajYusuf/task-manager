const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT
// app.use((req,res,next) => {
//   if(req.method === 'GET'){
//     res.send('Get requests are disabled')
//   }else{
//       next()
//   }
// })

// app.use((req,res,next) => {
//     if(req.method === req.method)
//     res.status(503).send('Site is under maintainance please try again after sometime')
// })
app.use(express.json())
app.use(userRouter)  //registering router with express app
app.use(taskRouter)

// port listening
app.listen(port,() => {
    console.log('Server is up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async() => {
//     // const task = await Task.findById('6171393796381fcd0bc20365')
//     // await task.populate([{path: 'owner'}])
//     // console.log(task.owner)
//    const user = await User.findById('6172477768137340f8c5fbeb')
//    await user.populate('tasks')
//    console.log(user.tasks)
// }

// main()
