const fs = require('fs');

const projectList = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/jsonData/projectList.json`)
);

exports.getAllProjectList = (req, res) => {
    res.status(200)
        .json({
            status: 200,
            result: {
                projectList
            }
        })
}