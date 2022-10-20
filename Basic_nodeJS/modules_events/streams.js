// Streams
// ////////////////////////////////////////
const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // //  Simple read file
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log('Error Occured!!');
    //     res.end(data);
    // })

    // // Using Stream 
    // const readAble = fs.createReadStream(`${__dirname}/test-file.txt`);
    // readAble.on('data', chunk => {
    //     res.write(chunk);
    // }); 
    // readAble.on('end', () => {
    //     res.end();
    // });
    // req.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not Found');
    // })
    
    
    // PIPE operator
    const readAble = fs.createReadStream(`${__dirname}/test-fillle.txt`);
    readAble.pipe(res);


});

server.listen(3000);