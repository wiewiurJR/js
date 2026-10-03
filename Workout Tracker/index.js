const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
   res.redirect('/login');
});


app.get('/login', (req, res) => {
    res.render('login');

})
app.get('/register', (req, res) => {
    res.render('register');

})

app.post('/login', (req, res) => {
    res.render('login');
    console.log(req.body.email);
    console.log(req.body.password);
})


app.listen(PORT, () => console.log(`server running http://localhost:${PORT}`));

