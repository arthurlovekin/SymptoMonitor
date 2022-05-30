// https://www.youtube.com/watch?v=FsMb1RZyiYo
// https://github.com/extrabacon/python-shell
let {PythonShell} = require('python-shell') //this works if you run `node classifier.js`, and <script text="text/javascript" src="classifier.js"></script> in the html
// import {PythonShell} from 'python-shell'; 
// >npm init -y
// npm i python-shell
// npm i express
const express = require('express');
const path = require('path');
const app = express()
const PORT = 3000;

// serve static files from public directory
// Creates a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} (go to http://localhost:${PORT}/)`);
})

var CLASSIFIER = CLASSIFIER || {};
CLASSIFIER.diseases = [];
CLASSIFIER.scores = [];

//TODO: Get symptoms list from other frontend js
app.post("/classify", function(req, res) {
    console.log("Classifying..."); //logs in terminal, not browser
    console.log(req.body); 
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        args: req.body
    };

    PythonShell.run('classify.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        CLASSIFIER.diseases = results[0];
        CLASSIFIER.scores = results[1];
        console.log('Diseases: %j', CLASSIFIER.diseases);
        console.log('Scores: %j', CLASSIFIER.scores);
    });
});

// get the click data from the database
app.get('/classify', (req, res) => {
    res.send(CLASSIFIER);
});

