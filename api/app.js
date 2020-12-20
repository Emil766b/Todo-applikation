const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

// Mongoose models 
const { List, Task } = require('./db/models');

// Load express bodyParser middleware
app.use(bodyParser.json());

// CORS stuff
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Routs handelers

// List routes

// Get all lists
app.get('/lists', (req, res) => {
    // Return array of lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    });
})

// Post lists
app.post('/lists', (req, res) => {
    // Create new list an return new list document
    // List information will be passed in via the JSON request body
    let title = req.body.title;

    let newList = new List ({
        title
    });
    newList.save().then((listDoc) => {
        // List document is returned
        res.send(listDoc);
    })
});

// Update lists
app.patch('/lists/:id', (req, res) => {
    // Update lists with the new values
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

// Delete lists
app.delete('/lists/:id', (req, res) => {
    // Delete spesefied list
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});

// Get all tasks
app.get('/lists/:listId/tasks', (req,res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});
    // Return all tasks


// Create a new task 
app.post('/lists/:listId/tasks', (req, res) => {
    // create a new task in a list
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

// Update existing task
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // Update existing task by taskId
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }
    ).then(() => {
        res.send({message: 'Updated successfully'})
    })
});

// Delete task
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})