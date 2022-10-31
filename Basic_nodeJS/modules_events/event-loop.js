const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const EventEmitter = require('events');

// Understanding the event loop of NodeJS
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
//         console.log("Time taken: ",Date.now() - start, 'Password Encrypted');
//     })
// });
// console.log('I am top level code!!');



//////////////////////////////// EVENT EMITTER /////////////////////////////////////
// const myEmitter = new EventEmitter();
//Extending the event emitter in a class
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
// // New event listener
// myEmitter.once("newListener", (event, listener) => {
//     if (event === "listener") {
//         myEmitter.on("listener", () => {
//             console.log('Once event emitter!!')
//         })
//     }
// })
// myEmitter.on("listener", args => {
//     console.log('This is listener 4!!', `With ${args} agruments`);
// });
// myEmitter.emit('listener', 1);


/////////////////////////////////////////////////////
const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request 1 received');
    res.end('Request 1 received');
});
server.on('request', (req, res) => {
    console.log('Request 2 received');
});

server.on('close', () => {
    console.log('Server closed!!')
});
server.listen(3000, () => {
    console.log("Server listening on port 3000")
});