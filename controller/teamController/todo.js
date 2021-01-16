const Todo = require('../../model/teamModel/todo')
const Team = require('../../model/team')

/* @Store Todo List*/
exports.addTodo = (req, res, next) => {
    
    const teamId = req.session.teamId
    Todo.create({
        ...req.body,
        teamId
    }, (error, todo) => {
        if (error) {
            req.flash("todo-err", "Team member in Role")
            res.redirect("/team-dashboard");
        } else {
            Team.findByIdAndUpdate(teamId, { $push: { todo: todo.id } }, {new: true})
            .then( result => {
                res.redirect("/team-dashboard")
            })
        }
    })
}

/* @delete Todo List*/
exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id
    Todo.findByIdAndDelete(todoId)
    .then(result => {
        console.log(result)
        res.redirect("/team-dashboard")
    })
    .catch(error => {
        console.log(error)
    })
}
