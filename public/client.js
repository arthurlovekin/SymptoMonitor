//https://gist.github.com/aerrity/fd393e5511106420fba0c9602cc05d35
// https://www.youtube.com/watch?v=5TxF9PQaq4U
var symptoms_list = ["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"];
const button = document.getElementById('submitSymptoms');
var diseases = [];
var scores = [];

button.addEventListener('click', function(e) {
  console.log('button was clicked');
  //Send symptoms to backend and get results
  fetch('/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(symptoms_list)
  })
  .then(response => response.json())
  .then(function(data) {
    diseases = data[0];
    scores = data[1];
    console.log(diseases);
    console.log(scores);
  });
});