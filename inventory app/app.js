const express = require('express');
const app = express();
const path = require('node:path');
const PORT = 3000;




app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const links = [
    { href: "/", text: "Home" },
    { href: "/new", text: "New" },
];



const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

app.get('/', (req, res) => res.render("index", {messages: messages, links: links }));

app.post('/', (req, res) =>{
    const message = req.body.message
    const name = req.body.name

    messages.push({text: message, user: name, added: new Date()})
    res.redirect('/');
    }
);

app.listen(PORT, (err) =>{
    if(err) throw err;
    console.log(`Server is running on port ${PORT}`);
})
