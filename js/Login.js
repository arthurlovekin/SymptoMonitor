var user = document.getElementById("username")
var pass = document.getElementById("pass")

var login_inactive = document.getElementsByClassName('login_inactive');
var login_active = document.getElementsByClassName('login_active');

var user_text_valid = false;
var pass_text_valid = false;

function display_login() {
	if (user_text_valid == true && pass_text_valid == true) {
		for (val of login_inactive) {
			val.style.display = 'none';
		}		
		for (val of login_active) {
			val.style.display = 'block';
		}		
	}
	else {
		for (val of login_inactive) {
			val.style.display = 'block';
		}		
		for (val of login_active) {
			val.style.display = 'none';
		}		
	}
}

user.oninput = function(event) {
	if (user.value != "") {
		user_text_valid = true;
	}
	else {
		user_text_valid = false;
	}
	display_login();
}

pass.oninput = function(event) {
	if (pass.value != "") {
		pass_text_valid = true;
	}
	else {
		pass_text_valid = false;
	}
	display_login();
}

function open_add_sym() {
	selected_symptom_list = [];
	selected_symptom_count = 0;
	quick_list = ["skin rash","chills","stomach pain","anxiety"];
	var symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze"];
	window.localStorage.setItem('selected_symptom_list', selected_symptom_list);
	window.localStorage.setItem('selected_symptom_count', selected_symptom_count);
	window.localStorage.setItem('quick_list', quick_list);
	window.localStorage.setItem('symptoms', symptoms);
	window.location.href = '../html/Add_Symptom.html';
}

function open_register() {
	selected_symptom_list = [];
	selected_symptom_count = 0;
	quick_list = ["skin rash","chills","stomach pain","anxiety"];
	var symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze"];
	window.localStorage.setItem('selected_symptom_list', selected_symptom_list);
	window.localStorage.setItem('selected_symptom_count', selected_symptom_count);
	window.localStorage.setItem('quick_list', quick_list);
	window.localStorage.setItem('symptoms', symptoms);
	window.location.href = '../html/Register.html';
}