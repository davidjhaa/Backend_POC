const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    console.log(req.method);
    console.log(req.url);

    res.setHeader('content-type', 'text/html');
    // res.write('<h1>Hello boyz :)</h1>');
    // res.write('<h1>How u doin :)</h1>');

    let path = "./views";
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            path += '/about.html';
            res.setHeader('location', '/about')
            res.statusCode = 301;
            res.end();
            break;
        default :
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, fileData)=>{
        if(err)
            console.log(err);
        else
            res.end(fileData);
    })

});

server.listen(5000, 'localhost', function(){
    console.log('server is listening on port 5000');
});