// require() method takes one arg as path to the module
// Returns and object 
const fs = require('fs');
const http = require('http');
const url = require('url');


// // Reading a file using fs
// const fileRead = fs.readFileSync('txt/input.txt', 'utf-8');
// console.log(fileRead);

// // Write file using fs
// const someString = `Hello World ${fileRead}. Welcome to Avocado world\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', someString);

// // Asynchronous
// // Reading a file asynchronously
// fs.readFile('txt/input.txt', 'utf-8', (err, read)=>{
//     console.log(read);
// });



// // Create Server with HTTP Request and Response
// http.createServer((req,res) => {
//     // Routing 
//     const path = req.url;
//     if(path === '/' || path === '/staffing'){
//         res.end("This is staffing page!!");
//     }else if(path === '/employee'){
//         res.end('This is employee page!!')
//     } else{
//         res.writeHead(404);
//         res.end('Page is not found!!');
//     }
// }).listen(3000);

// Create a simple API 
const readApi = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const apiServer = http.createServer((req, res) => {
    console.log(req.url);
    console.log(url.parse(req.url, true));
    const pathName = req.url;
    if (pathName === '/staffing' || pathName === '/') {
        res.end("This is staffing page!!");
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(readApi);
    } else {
        res.writeHead(404);
        res.end('Not found')
    }
})
apiServer.listen(3000);