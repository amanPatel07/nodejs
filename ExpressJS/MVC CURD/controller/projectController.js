const fs = require('fs');

const projectlist = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/jsonData/db.json`)
);

exports.checkId = (req, res, next, val) => {
    console.log(`Checking..!\nID ${val} is requested`);
    next();
} 

exports.checkBody = (req, res, next) => {
    debugger
    console.log(req.body.projectName)
    if(!req.body.projectName || !req.body.projectStatus){
        return res
            .status(404)
            .json({
                    message: 'Either projectName or projectStatus is missing in body'
                })
    }
    next();
}

const deleteFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${__dirname}/../dev-data/jsonData/db.json`, file, error => {
            if (error) reject('File not found!!..!')
            resolve('Done')
        });
    });
}

exports.getAllProject = (req, res) => {
    res.status(200)
        .json({
            status: 200,
            result: {
                projectlist
            }
        });
}

exports.getProject = (req, res) => {
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

exports.postProject = (req, res) => {
    const newId = projectlist[projectlist.length - 1].id + 1;
    const project = Object.assign({ id: newId }, req.body);
    projectlist.push(project);
    fs.writeFile(`${__dirname}/../dev-data/jsonData/db.json`, JSON.stringify(projectlist), err => {
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

exports.patchProject = (req, res) => {
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

exports.deleteProject = (req, res) => {
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