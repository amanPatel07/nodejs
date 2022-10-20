// // Understanding the event loop of NodeJS
// const fs = require('fs');
// const crypto = require('crypto');

// const start = Date.now();
// // // Changing the threadpool time to 1:
// // process.env.UV_THREADPOOL_SIZE = 1;

// setTimeout(() => console.log("I am set time out called after 0s!!"), 0);
// setImmediate(() => console.log('I am immediate!!'));
// fs.readFile('test.txt', () => {
//     console.log('I am reading a file!!');
//     console.log('-----------------------');
//     setTimeout(() => console.log("I am set time out called after 0s inside a callback!!"), 0);
//     setTimeout(() => console.log("I am set time out called after 3s inside a callback!!"), 3000);
//     setImmediate(() => console.log('I am immediate!!'));
//     process.nextTick(() => console.log('I am process.nextTick'));
//     crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
//         console.log(Date.now() - start, 'Password Encrypted');
//     })
//     // crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
//     //     console.log(Date.now() - start, 'Password Encrypted');
//     // })
//     // crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
//     //     console.log(Date.now() - start, 'Password Encrypted');
//     // })
//     // crypto.pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
//     //     console.log(Date.now() - start, 'Password Encrypted');
//     // })
// });
// console.log('I am top level code!!');
//




// EVENT EMITTER
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const EventEmitter = require('events');
// const http = require('http');
// const myEmitter = new EventEmitter();

// Extending the event emitter in a class
// class Listener extends EventEmitter {
//     constructor() {
//         super();
//     }
// }
// const myEmitter = new Listener();

// myEmitter.on("listener", () => {
//     console.log('This is listener 1!!');
// });
// myEmitter.on("listener", () => {
//     console.log('This is listener 2!!');
// });
// myEmitter.on("listener", args => {
//     console.log('This is listener 1!!', `With ${args} agruments`);
// });

// myEmitter.emit('listener', 1)


// // /////////////////////////////////////////////////////
// const server = http.createServer();
// server.on('request', (req, res) => {
//     console.log('Request 1 received');
//     res.end('Request 1 received');
// });
// server.on('request', (req, res) => {
//     console.log('Request 2 received');
// });

// server.on('close', () => {
//     console.log('Server closed!!')
// });

// server.listen(3000)