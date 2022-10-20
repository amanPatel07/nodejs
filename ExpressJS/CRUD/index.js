const express = require('express');
const fs = require('fs');

const port = 3000;

const app = express();

app.use(express.json());
////////////////--- CUSTOM MIDDLEWARE --//////////////
app.use((req, res, next) => {
    console.log('Hi, I am first middleware');
    next();
})
app.use((req, res, next) => {
    console.log('Hi, I am second middleware');
    next();
})

// READ FILE FOR THE PROJECT LIST
const projectlist = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/jsonData/db.json`));
// DELETE PROJECT IN FILE
const deleteFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${__dirname}/dev-data/jsonData/db.json`, file, error => {
            if (error) reject('File not found!!..!')
            resolve('Done')
        });
    });
}

const getAllProjects = (req, res) => {
    res.status(200)
        .json({
            status: 200,
            result: {
                projectlist
            }
        });
}

const getProject = (req, res) => {
    const id = req.params.id * 1;
    const project = projectlist.find(el => el.id === id);
    if (!project) {
        res.status(404)
            .json({
                status: 404,
                result: 'Invalid ID'
            });
    }
    else {
        res.status(201)
            .json({
                status: 201,
                result: {
                    project
                }
            });
    }
}

const postProject = (req, res) => {
    const newId = projectlist[projectlist.length - 1].id + 1;
    const project = Object.assign({ id: newId }, req.body);
    projectlist.push(project);
    fs.writeFile(`${__dirname}/dev-data/jsonData/db.json`, JSON.stringify(projectlist), err => {
        console.log(err);
    });
    res.status(201)
        .json({
            status: 200,
            result: {
                project
            }
        });
}

const patchProject = (req, res) => {
    if (req.params.id * 1 > projectlist.length) {
        res.status(404)
            .json({
                status: 404,
                result: 'Invalid ID'
            });
    }
    else {
        res.status(201)
            .json({
                status: 201,
                result: {
                    message: 'Updated...!!'
                }
            });
    }
}

const deleteProject = (req, res) => {
    const id = req.params.id * 1;
    if (id > projectlist.length) {
        res.status(404)
            .json({
                status: 404,
                result: 'Invalid ID'
            });
    }
    else {
        const index = projectlist.findIndex(element => element.id === id);
        projectlist.splice(index, 1)
        deleteFile(JSON.stringify(projectlist))
            .then(() => {
                res.status(204)
                    .json({
                        status: 204,
                        result: {
                            message: 'Updated...!!'
                        }
                    });
            })
            .catch(error => {
                res.status(404)
                    .json({
                        status: 404,
                        message: error
                    });
            });
    }
}

/*
// GET PROJECT LIST FROM JSON
app.get('/api/v1/projects', getAllProjects);

// POST NEW PROJECT TO JSON
app.post('/api/v1/projects', postProject);

// GET PROJECT BY ID
app.get('/api/v1/projects/:id', getProject);

// PATCH PROJECT    
app.patch('/api/v1/projects/:id', patchProject);

// DELETE PROJECT
app.delete('/api/v1/projects/:id', deleteProject);
*/


//////////////////////////////////////////-- REFACTORING CODE --/////////////////////////////////////////////////
/*
app.route('/api/v1/projects')
    .get(getAllProjects)
    .post(postProject)

app.route('/api/v1/projects/:id')
    .get(getProject)
    .patch(patchProject)
    .delete(deleteProject)
*/

////////////////////////////////////////-- MOUNTING AND MULITPLE ROUTERS --//////////////////////////////////////
const projectRouter = express.Router();

projectRouter.route('/')
    .get(getAllProjects)
    .post(postProject);

projectRouter.route('/:id')
    .get(getProject)
    .patch(patchProject)
    .delete(deleteProject)

app.use('/api/v1/projects', projectRouter);



/////////////////////////////////////////-- Server Listening --/////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Application Running on ${port}`);
});

