const express = require('express');

const app = express();

app.listen(3000);

app.get('/',(req, res)=>{
    res.sendFile('C:\Users\david\Desktop\backend\views\index.html');
});

app.get('/about',(req, res)=>{
    res.sendFile('./views/about.html', {root:__dirname});
})

// redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

// 404 page or if page not found then ot will encounter
app.use((req,res)=>{
    res.status(404).sendFile('/views/404.html', {root:__dirname});
});