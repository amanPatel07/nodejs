const fs = require('fs');
const superagent = require('superagent');
const path = require('path');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('Sorry, Not Found')
            resolve(data)
        })
    })
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Huh, not writeable')
            resolve('Alas, File Written')
        })
    })
}

////////////////////////////////////////////////////////////////////////////////
// // Promise
// readFilePro(`${__dirname}/dog.txt`)
//     .then(res => {
//         return superagent.get(res)
//     })
//     .then(res => {
//         return writeFilePro('dog-list.txt', 'my list')
//     })
//     .then(() => {
//         console.log('Hurrah, Done!!')
//     })
//     .catch(err => {
//         console.log(err)
//     })

// const pathname = path.basename('/node_modules/bin')
// console.log(pathname)



////////////////////////////////////////////////////////////////////////////////////
// Async await
/*
const getFileRead = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log('File reading done', data)

        const fetching = await superagent.get(data)
        console.log("Fetching done!!");

        await writeFilePro('dog-list', 'my final list')
    }
    catch (err) {
        console.log(err)
        throw err
    }
    return 'Hello World'
}
getFileRead()
*/

// ( async () => {
//     const x = await getFileRead();
//     console.log(x)
// })()

// const x = getFileRead()
// console.log(x)

// getFileRead().then(res => {
//     console.log('Promise done')
// }).catch(err => {
//     console.log(err)
// })

///////////////////////////////////////////////////////
// Promise all
/*
const getFileRead = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log('File reading done', data)

        const fetching1 = superagent.get(data)
        console.log("Fetching done!!");

        const fetching2 = superagent.get(data)
        console.log("Fetching done!!");

        const fetching3 = superagent.get(data)
        console.log("Fetching done!!");

        const allPromise = await Promise.all([fetching1, fetching2, fetching3]);
        console.log(allPromise)
        const finaldata = allPromise.map(el => el.body.message)
        console.log(finaldata)

        await writeFilePro('dog-list.txt', JSON.stringify(finaldata))
    }
    catch (err) {
        console.log(err)
        throw err
    }
    return 'Hello World'
}
getFileRead()
*/


const writeFilePro1 = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Huh, not writeable')
            resolve('Alas, File Written')
        })
    })
}

const deleteFile = file => {
    return new Promise((resolve, reject) => {
        fs.unlink(file, err => {
            if(err) reject('Deletin...........!!')
            resolve('Finallyyyyy!! Deleted')
        })
    })
}

writeFilePro1('delete.txt', 'delete')
    .then(() => {
        const deleting = setTimeout(() => {
            return deleteFile(`${__dirname}/delete.txt`);
        }, 5000)
        return deleting
    })
    .then(()=> {
        console.log('Done')
    })



// writeFilePro1('delete.txt', 'delete')
//     .then(()=> {
//         console.log('Done')
//     })

// const getDeletedFile = async () => {
//     const writing = await writeFilePro1('delete.txt', 'delete')
//     console.log(writing)
     
//     await deleteFile(`${__dirname}/delete.txt`)
// }
// getDeletedFile()
