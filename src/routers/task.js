const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


//////////////TASKS/////////////
//Adding tasks
router.post('/addTask',auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//requesting tasks
router.get('/tasks',auth, async (req, res) => {
<<<<<<< HEAD
    try {
        // const tasks = await Task.find({owner: req.user._id})
        // either approach is gonna work
        await req.user.populate('tasks')
=======
   const match = {}
   const sort = {}
   if(req.query.completed){
    match.completed = req.query.completed === 'true'
   } 
   if(req.query.sortBy){
       const parts = req.query.sortBy.split('_')//splits the value after the special character
       sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 //ternary operator
   }
    try {
        // const tasks = await Task.find({owner: req.user._id})
        // either approach is gonna work
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit) || null,
                skip: parseInt(req.query.skip) || null,
                sort
            }
        })
>>>>>>> lap
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//requesting tasks with id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id,owner: req.user._id})

        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

//updating tasks
router.patch('/tasks/:id', auth,async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({
            error: 'invalid update'
        })
    }

    try{
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if(!task){
           return res.status(404).send()
        }
           updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

//deleting tasks
router.delete('/tasks/:id',auth,async(req,res) => {

    try{
        const task = await Task.findOneAndDelete({_id: req.params.id,owner: req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.status(200).send(task)
    }catch (e){
        res.status(500).send(e)
    }

})



module.exports = router