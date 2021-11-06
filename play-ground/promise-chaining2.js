require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('6149ad9440997de1f211c77d').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false})
}).then((result) => {
console.log(result)
}).catch((e) => {
    console.log(e)
})


const taskDeleteAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

taskDeleteAndCount('6149ad9440997de1f211c77d').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})