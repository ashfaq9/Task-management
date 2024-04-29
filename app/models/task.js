const mongoose =require('mongoose')
const {Schema,model} =mongoose

const taskSchema= new Schema({
title:String,
description:String,
dueDate:Date,
status:{type:String,
options:['pending','inProgress','completed'],default:'pending'},
},
{timeStamps:true})

const Task= model('Task',taskSchema)

module.exports =Task