//https://gist.github.com/aerrity/fd393e5511106420fba0c9602cc05d35
const button = document.getElementById('submitSymptoms');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
//TODO: send symptoms to backend (body doesn't work)
  fetch('/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"])
    })
  .then(function(response) {
    if(response.ok) {
      console.log('Click was recorded');
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
});