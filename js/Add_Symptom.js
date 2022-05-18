selected_symptom_list = [];
selected_symptom_count = 0;

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

quick_list = ["skin rash", "chills", "stomach pain", "anxiety"];

var suggested_symptom_1 = document.getElementsByClassName('suggested_symptom_1');
var suggested_symptom_2 = document.getElementsByClassName('suggested_symptom_2');
var suggested_symptom_3 = document.getElementsByClassName('suggested_symptom_3');
var suggested_symptom_4 = document.getElementsByClassName('suggested_symptom_4');


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


var symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze","prognosis"];
symptoms.sort();
autocomplete(document.getElementById("symptom"), symptoms);