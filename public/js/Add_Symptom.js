// -----------------------------------------------
// From Python
quick_list = ['breathlessness', 'stomach pain', 'vomiting', 'mucoid sputum', 'fatigue', 'ulcers on tongue'];
top_diseases = ['Fungal infection', 'GERD', 'Bronchial Asthma'];
max_symptom = 'itching';

// -----------------------------------------------


selected_symptom_list = window.localStorage.getItem('selected_symptom_list');
if (selected_symptom_list == "")
	selected_symptom_list = [];
else
	selected_symptom_list = selected_symptom_list.split(',');

selected_symptom_count = parseInt(window.localStorage.getItem('selected_symptom_count'));

symptoms = window.localStorage.getItem('symptoms').split(',');
symptoms.sort();

var selected_symptom_1 = document.getElementsByClassName('selected_symptom_1');
var selected_symptom_2 = document.getElementsByClassName('selected_symptom_2');
var selected_symptom_3 = document.getElementsByClassName('selected_symptom_3');
var selected_symptom_4 = document.getElementsByClassName('selected_symptom_4');
var selected_symptom_5 = document.getElementsByClassName('selected_symptom_5');
var selected_symptom_6 = document.getElementsByClassName('selected_symptom_6');

var submit_inactive = document.getElementsByClassName('submit_inactive');
var submit_active = document.getElementsByClassName('submit_active');

var selected = document.getElementsByClassName('selected');
var suggested_symptoms_tag = document.getElementsByClassName('suggested_symptoms_tag');

var suggested_symptom_1 = document.getElementsByClassName('suggested_symptom_1');
var suggested_symptom_2 = document.getElementsByClassName('suggested_symptom_2');
var suggested_symptom_3 = document.getElementsByClassName('suggested_symptom_3');
var suggested_symptom_4 = document.getElementsByClassName('suggested_symptom_4');

var predicted_disease_tag = document.getElementsByClassName('predicted_disease_tag');
var predicted_disease = document.getElementsByClassName('predicted_disease');
var best_symptom_tag = document.getElementsByClassName('best_symptom_tag');
var best_symptom = document.getElementsByClassName('best_symptom');


function autocomplete(inp, arr) {	
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {	  
	  var a, b, i, val = this.value;
	  /*close any already open lists of autocompleted values*/
	  closeAllLists();
	  if (!val) { return false;}
	  currentFocus = -1;
	  /*create a DIV element that will contain the items (values):*/
	  a = document.createElement("DIV");
	  a.setAttribute("id", this.id + "autocomplete-list");
	  a.setAttribute("class", "autocomplete-items");
	  /*append the DIV element as a child of the autocomplete container:*/
	  this.parentNode.appendChild(a);
	  /*for each item in the array...*/
	  for (i = 0; i < arr.length; i++) {
		/*check if the item starts with the same letters as the text field value:*/
		if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
		  /*create a DIV element for each matching element:*/
		  b = document.createElement("DIV");
		  /*make the matching letters bold:*/
		  b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
		  b.innerHTML += arr[i].substr(val.length);
		  /*insert a input field that will hold the current array item's value:*/
		  b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
		  /*execute a function when someone clicks on the item value (DIV element):*/
			  b.addEventListener("click", function(e) {
			  /*insert the value for the autocomplete text field:*/
			  inp.value = this.getElementsByTagName("input")[0].value;
			  			  
			    // Update the list of symptoms selected
			    selected_symptom_list.push(inp.value)
			    selected_symptom_count = selected_symptom_count+1;

				var index = symptoms.indexOf(inp.value);
				if (index !== -1) {
					symptoms.splice(index, 1);
				}				
				var index = quick_list.indexOf(inp.value);
				if (index !== -1) {
					quick_list.splice(index, 1);
				}				
				
				display_sym();
				
			  			  
			  inp.value = "";			
			  /*close the list of autocompleted values,
			  (or any other open lists of autocompleted values:*/
			  closeAllLists();
		  });
		  a.appendChild(b);
		}
	  }
  });
  
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
	  var x = document.getElementById(this.id + "autocomplete-list");
	  if (x) x = x.getElementsByTagName("div");
	  if (e.keyCode == 40) {
		/*If the arrow DOWN key is pressed,
		increase the currentFocus variable:*/
		currentFocus++;
		/*and and make the current item more visible:*/
		addActive(x);
	  } else if (e.keyCode == 38) { //up
		/*If the arrow UP key is pressed,
		decrease the currentFocus variable:*/
		currentFocus--;
		/*and and make the current item more visible:*/
		addActive(x);
	  } else if (e.keyCode == 13) {
		/*If the ENTER key is pressed, prevent the form from being submitted,*/
		e.preventDefault();
		if (currentFocus > -1) {
		  /*and simulate a click on the "active" item:*/
		  if (x) x[currentFocus].click();
		}
	  }
  });
  function addActive(x) {
	/*a function to classify an item as "active":*/
	if (!x) return false;
	/*start by removing the "active" class on all items:*/
	removeActive(x);
	if (currentFocus >= x.length) currentFocus = 0;
	if (currentFocus < 0) currentFocus = (x.length - 1);
	/*add class "autocomplete-active":*/
	x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
	/*a function to remove the "active" class from all autocomplete items:*/
	for (var i = 0; i < x.length; i++) {
	  x[i].classList.remove("autocomplete-active");
	}
  }
  function closeAllLists(elmnt) {
	/*close all autocomplete lists in the document,
	except the one passed as an argument:*/
	var x = document.getElementsByClassName("autocomplete-items");
	for (var i = 0; i < x.length; i++) {
	  if (elmnt != x[i] && elmnt != inp) {
	  x[i].parentNode.removeChild(x[i]);
	}
  }
}

/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
	closeAllLists(e.target);
});
}

function display_suggestions() {
	// Clear all Suggestions
	for (val of suggested_symptom_1) {
		val.style.display = 'none';
	}				
	for (val of suggested_symptom_2) {
		val.style.display = 'none';
	}				
	for (val of suggested_symptom_3) {
		val.style.display = 'none';
	}				
	for (val of suggested_symptom_4) {
		val.style.display = 'none';
	}
	// Display Quick List Array
	if (quick_list.length == 1) {
		for (val of suggested_symptom_1) {
			val.style.display = 'block';
			val.textContent = quick_list[0];
		}
	}
	if (quick_list.length == 2) {
		for (val of suggested_symptom_1) {
			val.style.display = 'block';
			val.textContent = quick_list[0];
		}
		for (val of suggested_symptom_2) {
			val.style.display = 'block';
			val.textContent = quick_list[1];
		}
	}
	if (quick_list.length == 3) {
		for (val of suggested_symptom_1) {
			val.style.display = 'block';
			val.textContent = quick_list[0];
		}
		for (val of suggested_symptom_2) {
			val.style.display = 'block';
			val.textContent = quick_list[1];
		}
		for (val of suggested_symptom_3) {
			val.style.display = 'block';
			val.textContent = quick_list[2];
		}
	}
	if (quick_list.length == 4) {
		for (val of suggested_symptom_1) {
			val.style.display = 'block';
			val.textContent = quick_list[0];
		}
		for (val of suggested_symptom_2) {
			val.style.display = 'block';
			val.textContent = quick_list[1];
		}
		for (val of suggested_symptom_3) {
			val.style.display = 'block';
			val.textContent = quick_list[2];
		}
		for (val of suggested_symptom_4) {
			val.style.display = 'block';
			val.textContent = quick_list[3];
		}
	}
	
}

function display_sym() {
	// Clear all Symptoms				
	for (val of selected_symptom_1) {
		val.style.display = 'none';
	}				
	for (val of selected_symptom_2) {
		val.style.display = 'none';
	}				
	for (val of selected_symptom_3) {
		val.style.display = 'none';
	}				
	for (val of selected_symptom_4) {
		val.style.display = 'none';
	}				
	for (val of selected_symptom_5) {
		val.style.display = 'none';
	}				
	for (val of selected_symptom_6) {
		val.style.display = 'none';
	}				
	
	// Display only selected symptoms
	if (selected_symptom_count == 1) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
	}
	if (selected_symptom_count == 2) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
		for (val of selected_symptom_2) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[1];
		}
	}
	if (selected_symptom_count == 3) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
		for (val of selected_symptom_2) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[1];
		}
		for (val of selected_symptom_3) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[2];
		}
	}
	if (selected_symptom_count == 4) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
		for (val of selected_symptom_2) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[1];
		}
		for (val of selected_symptom_3) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[2];
		}
		for (val of selected_symptom_4) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[3];
		}
	}
	if (selected_symptom_count == 5) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
		for (val of selected_symptom_2) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[1];
		}
		for (val of selected_symptom_3) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[2];
		}
		for (val of selected_symptom_4) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[3];
		}
		for (val of selected_symptom_5) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[4];
		}
	}
	if (selected_symptom_count >= 6) {
		for (val of selected_symptom_1) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[0];
		}
		for (val of selected_symptom_2) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[1];
		}
		for (val of selected_symptom_3) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[2];
		}
		for (val of selected_symptom_4) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[3];
		}
		for (val of selected_symptom_5) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[4];
		}
		for (val of selected_symptom_6) {
			val.style.display = 'block';
			val.textContent = selected_symptom_list[5];
		}
	}		

	if (selected_symptom_count > 0) {
		for (val of submit_inactive) {
			val.style.display = 'none';
		}		
		for (val of submit_active) {
			val.style.display = 'block';
		}		
		for (val of selected) {
			val.style.display = 'block';
		}				
		for (val of suggested_symptoms_tag) {
			val.style.display = 'block';
		}
		for (val of predicted_disease_tag) {
			val.style.display = 'block';
		}
		for (val of predicted_disease) {
			val.style.display = 'block';
			val.textContent = top_diseases[0];
		}
		for (val of best_symptom_tag) {
			val.style.display = 'block';
		}
		for (val of best_symptom) {
			val.style.display = 'block';
			val.textContent = max_symptom;
		}				
		display_suggestions();
	}
	else {
		for (val of submit_inactive) {
			val.style.display = 'block';
		}		
		for (val of submit_active) {
			val.style.display = 'none';
		}				
		for (val of selected) {
			val.style.display = 'none';
		}
		for (val of suggested_symptoms_tag) {
			val.style.display = 'none';
		}
		for (val of predicted_disease_tag) {
			val.style.display = 'none';
		}
		for (val of predicted_disease) {
			val.style.display = 'none';
		}
		for (val of best_symptom_tag) {
			val.style.display = 'none';
		}
		for (val of best_symptom) {
			val.style.display = 'none';
		}		
		// Clear all Suggestions
		for (val of suggested_symptom_1) {
			val.style.display = 'none';
		}				
		for (val of suggested_symptom_2) {
			val.style.display = 'none';
		}				
		for (val of suggested_symptom_3) {
			val.style.display = 'none';
		}				
		for (val of suggested_symptom_4) {
			val.style.display = 'none';
		}
		// Reset list
		quick_list = ["skin rash", "chills", "stomach pain", "anxiety"];
	}
			
}

function remove_sym1() {
	symptoms.push(selected_symptom_list[0])
	selected_symptom_list.splice(0, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function remove_sym2() {
	symptoms.push(selected_symptom_list[1])
	selected_symptom_list.splice(1, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function remove_sym3() {
	symptoms.push(selected_symptom_list[2])
	selected_symptom_list.splice(2, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function remove_sym4() {
	symptoms.push(selected_symptom_list[3])
	selected_symptom_list.splice(3, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function remove_sym5() {
	symptoms.push(selected_symptom_list[4])
	selected_symptom_list.splice(4, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function remove_sym6() {
	symptoms.push(selected_symptom_list[5])
	selected_symptom_list.splice(5, 1);
	selected_symptom_count = selected_symptom_count - 1;
	symptoms.sort();
	display_sym();
}

function add_sym1() {	
	var suggestion = quick_list[0];
	var index = symptoms.indexOf(suggestion);
	if (index !== -1) {
		symptoms.splice(index, 1);
	}
	var index = quick_list.indexOf(suggestion);
	if (index !== -1) {
		quick_list.splice(index, 1);
	}
	selected_symptom_list.push(suggestion);
	selected_symptom_count = selected_symptom_count + 1;
	display_sym();
}

function add_sym2() {	
	var suggestion = quick_list[1];
	var index = symptoms.indexOf(suggestion);
	if (index !== -1) {
		symptoms.splice(index, 1);
	}
	symptoms.sort();
	var index = quick_list.indexOf(suggestion);
	if (index !== -1) {
		quick_list.splice(index, 1);
	}
	var index = quick_list.indexOf(suggestion);
	if (index !== -1) {
		quick_list.splice(index, 1);
	}
	selected_symptom_list.push(suggestion);
	selected_symptom_count = selected_symptom_count + 1;
	display_sym();
}

function add_sym3() {	
	var suggestion = quick_list[2];
	var index = symptoms.indexOf(suggestion);
	if (index !== -1) {
		symptoms.splice(index, 1);
	}
	symptoms.sort();
	var index = quick_list.indexOf(suggestion);
	if (index !== -1) {
		quick_list.splice(index, 1);
	}
	selected_symptom_list.push(suggestion);
	selected_symptom_count = selected_symptom_count + 1;
	display_sym();
}

function add_sym4() {	
	var suggestion = quick_list[3];
	var index = symptoms.indexOf(suggestion);
	if (index !== -1) {
		symptoms.splice(index, 1);
	}
	symptoms.sort();
	var index = quick_list.indexOf(suggestion);
	if (index !== -1) {
		quick_list.splice(index, 1);
	}
	selected_symptom_list.push(suggestion);
	selected_symptom_count = selected_symptom_count + 1;
	display_sym();
}

function open_login() {
	window.location.href = '../html/Login.html';
}

function open_results_all() {
	window.localStorage.setItem('selected_symptom_list', selected_symptom_list);
	window.localStorage.setItem('selected_symptom_count', selected_symptom_count);
	window.localStorage.setItem('quick_list', quick_list);
	window.localStorage.setItem('symptoms', symptoms);
	window.location.href = '../html/Results_All.html';
}

display_sym();
autocomplete(document.getElementById("symptom"), symptoms);