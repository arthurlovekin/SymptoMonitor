// https://www.youtube.com/watch?v=FsMb1RZyiYo
// https://github.com/extrabacon/python-shell
// login tutorial: https://heynode.com/tutorial/process-user-login-form-expressjs/

let {PythonShell} = require('python-shell') //this works if you run `node classifier.js`, and <script text="text/javascript" src="classifier.js"></script> in the html
const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express()
app.use(express.json()); //parse post and get requests as json
app.use('/static', express.static(path.join(__dirname, 'public'))) // serve static files from public directory (virtual path prefix)

//Route to homepage
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Route to Login Page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} (go to http://localhost:${PORT}/)`);
})

// Route to classifier page
app.post("/classify", function(req, res) {
    console.log("Classifying..."); //logs in terminal, not browser
    console.log(req.body); 
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        args: req.body
    };

    PythonShell.run('./model/classify.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        res.send(results);
        console.log('Diseases: %j', results[0]);
        console.log('Scores: %j', results[1]);
    });
});

