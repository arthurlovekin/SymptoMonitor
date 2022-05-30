// https://www.youtube.com/watch?v=FsMb1RZyiYo
// https://github.com/extrabacon/python-shell
let {PythonShell} = require('python-shell') //this works if you run `node classifier.js`, and <script text="text/javascript" src="classifier.js"></script> in the html
// import {PythonShell} from 'python-shell'; 
// >npm init -y
// npm i python-shell

let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: ["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"]
};

PythonShell.run('classify.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
});





// // Exchanging data between Python and Node.js
// let pyshell = new PythonShell('my_script.py',{ mode: 'text'});

// // sends a message to the Python script via stdin
// pyshell.send('hello world');

// pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err,code,signal) {
//   if (err) throw err;
//   console.log('The exit code was: ' + code);
//   console.log('The exit signal was: ' + signal);
//   console.log('finished');
// });