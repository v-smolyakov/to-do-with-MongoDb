const { response } = require('express');
const Task = require('../../db/models/tasks/index')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result =>{
    res.send({data: result})
  })
};

module.exports.createNewTask = (req, res, next) => {
  const task = new Task(req.body)
  task.save().then(result => {
    res.send(result)
  })
};


module.exports.changeTaskInfo = (req, res, next) => {
  Task.updateOne({_id: req.body.id}, req.body).then(resul => {
    Task.find({_id: req.body.id}).then(result => {
      res.send(result)
    })
  })
};

module.exports.deleteTask = (req, res, next) => {
  console.log(req.query)
  Task.deleteOne({_id: req.query.id})
  .then(response => res.send(response))
};

