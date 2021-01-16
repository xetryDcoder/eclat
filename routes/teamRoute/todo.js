const express = require('express')

const todoController = require('../../controller/teamController/todo')

const router = express.Router()

/* @post Todo Routes */
router.post('/todo', todoController.addTodo)

/* @delete Todo Routes */
router.get("/todo/:id", todoController.deleteTodo);

module.exports = router