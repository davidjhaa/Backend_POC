const express = require('express');

const app = express();

app.listen(3000);

// GET METHOD
app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/about',(req, res)=>{
    res.sendFile(__dirname + '/views/about.html');
})

// redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

// 404 page or if page not found then it will encounter
app.use((req,res)=>{
    res.status(404).sendFile('/views/404.html', {root:__dirname});
});

// POST METHOD
