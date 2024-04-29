const Task= require('../models/user-model')
// const {validationResult} =require('express-validator')
const TaskCltr ={}

TaskCltr.create=async(req,res)=>{
// const errors= validationResult(req)
// if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()})
// }

try{
const body= req.body
const task= new Task(body)
// task.userId =req.user.userId
await task.save()
res.json(task)
}catch(err){
    console.log(err);
    res.status(500).json({errors:"something went wrong "})
}
}


TaskCltr.show = async (req, res) => {
    try {
        // _id
        const task = await Task.findOne({ userId: req.user.id }) 
        res.json(task)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}


TaskCltr.update = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    try { 
        const body = req.body 
        const task = await Task.findOneAndUpdate({ userId: req.user.id }, body, { new: true })
        res.json(task)
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}


module.exports =TaskCltr