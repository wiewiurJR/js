const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.urlencoded({ extended: true}));

const FindId = (tasks) => {
if(tasks.length === 0){return 1}
return Math.max(...tasks.map(t => t.id))+1;

}


if(!fs.existsSync('tasks.json')){
    fs.writeFileSync('tasks.json','[]');
}

app.get("/", (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json','utf-8'));
    res.render('tasks', {tasks})

});
app.post('/tasks', (req, res) => {
    const {title} = req.body;
    const tasks = JSON.parse(fs.readFileSync('tasks.json','utf-8'));
    const newTask = {id: FindId(tasks),title, completed: false}
    tasks.push(newTask);


    fs.writeFileSync('tasks.json',JSON.stringify(tasks , null , 2));
    res.redirect('/');
})

app.post('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const tasks = JSON.parse(fs.readFileSync('tasks.json','utf-8'));
    const taskIndex = tasks.findIndex(task=> task.id === taskId);
    if(taskIndex === -1){
    return  res.status(404).send('Task not found');
    }
    const {_method,completed} = req.body;
    if(_method === 'PUT'){
console.log(completed);
tasks[taskIndex].completed = completed === 'on';
    fs.writeFileSync('tasks.json',JSON.stringify(tasks , null , 2));
    res.redirect('/');
    }else if(_method === 'DELETE'){
        tasks.splice(taskIndex,1);

    }else{
        return res.status(400).send('Coś poszło nie tak');
    }
    fs.writeFileSync('tasks.json',JSON.stringify(tasks , null , 2));
    res.redirect('/');
})




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});