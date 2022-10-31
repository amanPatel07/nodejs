// import { readFile } from 'fs';
// import { pbkdf2 } from 'crypto';

// const start = Date.now();
// // // Changing the threadpool time to 1:
// // process.env.UV_THREADPOOL_SIZE = 1;

// // Understanding the event loop of NodeJS
// setTimeout(() => console.log("I am set time out called after 0s!!"), 0);
// setImmediate(() => console.log('I am immediate!!'));
// readFile('test.txt', () => {
//     console.log('I am reading a file!!');
//     console.log('-----------------------');
//     setTimeout(() => console.log("I am set time out called after 0s inside a callback!!"), 0);
//     setTimeout(() => console.log("I am set time out called after 3s inside a callback!!"), 3000);
//     setImmediate(() => console.log('I am immediate!!'));
//     process.nextTick(() => console.log('I am process.nextTick'));
//     pbkdf2('Password', 'salt', 100000, 1024, 'sha512', () => {
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