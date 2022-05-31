var user = document.getElementById("username")
var pass = document.getElementById("pass")
var repass = document.getElementById("repass")

var register_inactive = document.getElementsByClassName('register_inactive');
var register_active = document.getElementsByClassName('register_active');

var user_text_valid = false;
var pass_text_valid = false;
var repass_text_match = false;

function display_register() {
	if (user_text_valid == true && pass_text_valid == true && repass_text_match == true) {
		for (val of register_inactive) {
			val.style.display = 'none';
		}		
		for (val of register_active) {
			val.style.display = 'block';
		}		
	}
	else {
		for (val of register_inactive) {
			val.style.display = 'block';
		}		
		for (val of register_active) {
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
	display_register();
}

pass.oninput = function(event) {
	if (pass.value != "") {
		pass_text_valid = true;
	}
	else {
		pass_text_valid = false;
	}
	repass.value = "";
	display_register();
}

repass.oninput = function(event) {
	if (repass.value == pass.value) {
		repass_text_match = true;
	}
	else {
		repass_text_match = false;
	}
	display_register();
}

function open_add_sym() {
	window.location.href = '../html/Add_Symptom.html';
}

function open_login() {
	window.location.href = '../html/Login.html';
}


var gender_in1_unselected = document.getElementsByClassName('gender_in1_unselected');
var gender_in2_unselected = document.getElementsByClassName('gender_in2_unselected');
var gender_in3_unselected = document.getElementsByClassName('gender_in3_unselected');
var gender_in1_selected = document.getElementsByClassName('gender_in1_selected');
var gender_in2_selected = document.getElementsByClassName('gender_in2_selected');
var gender_in3_selected = document.getElementsByClassName('gender_in3_selected');

function select_gender_1() {
	for (val of gender_in1_selected) {
		val.style.display = 'block';
	}		
	for (val of gender_in2_selected) {
		val.style.display = 'none';
	}
	for (val of gender_in3_selected) {
		val.style.display = 'none';
	}	
	for (val of gender_in1_unselected) {
		val.style.display = 'none';
	}		
	for (val of gender_in2_unselected) {
		val.style.display = 'block';
	}
	for (val of gender_in3_unselected) {
		val.style.display = 'block';
	}	
}

function select_gender_2() {
	for (val of gender_in2_selected) {
		val.style.display = 'block';
	}		
	for (val of gender_in1_selected) {
		val.style.display = 'none';
	}
	for (val of gender_in3_selected) {
		val.style.display = 'none';
	}	
	for (val of gender_in2_unselected) {
		val.style.display = 'none';
	}		
	for (val of gender_in1_unselected) {
		val.style.display = 'block';
	}
	for (val of gender_in3_unselected) {
		val.style.display = 'block';
	}	
}

function select_gender_3() {
	for (val of gender_in3_selected) {
		val.style.display = 'block';
	}		
	for (val of gender_in2_selected) {
		val.style.display = 'none';
	}
	for (val of gender_in1_selected) {
		val.style.display = 'none';
	}	
	for (val of gender_in3_unselected) {
		val.style.display = 'none';
	}		
	for (val of gender_in2_unselected) {
		val.style.display = 'block';
	}
	for (val of gender_in1_unselected) {
		val.style.display = 'block';
	}	
}

function deselect_gender() {
	for (val of gender_in3_selected) {
		val.style.display = 'none';
	}		
	for (val of gender_in2_selected) {
		val.style.display = 'none';
	}
	for (val of gender_in1_selected) {
		val.style.display = 'none';
	}	
	for (val of gender_in3_unselected) {
		val.style.display = 'block';
	}		
	for (val of gender_in2_unselected) {
		val.style.display = 'block';
	}
	for (val of gender_in1_unselected) {
		val.style.display = 'block';
	}	
}

var smoke_in1_unselected = document.getElementsByClassName('smoke_in1_unselected');
var smoke_in2_unselected = document.getElementsByClassName('smoke_in2_unselected');
var smoke_in1_selected = document.getElementsByClassName('smoke_in1_selected');
var smoke_in2_selected = document.getElementsByClassName('smoke_in2_selected');

function select_smoke_1() {
	for (val of smoke_in1_selected) {
		val.style.display = 'block';
	}		
	for (val of smoke_in2_selected) {
		val.style.display = 'none';
	}
	for (val of smoke_in1_unselected) {
		val.style.display = 'none';
	}		
	for (val of smoke_in2_unselected) {
		val.style.display = 'block';
	}
}

function select_smoke_2() {
	for (val of smoke_in2_selected) {
		val.style.display = 'block';
	}		
	for (val of smoke_in1_selected) {
		val.style.display = 'none';
	}
	for (val of smoke_in2_unselected) {
		val.style.display = 'none';
	}		
	for (val of smoke_in1_unselected) {
		val.style.display = 'block';
	}
}

function deselect_smoke() {
	for (val of smoke_in1_selected) {
		val.style.display = 'none';
	}		
	for (val of smoke_in2_selected) {
		val.style.display = 'none';
	}
	for (val of smoke_in1_unselected) {
		val.style.display = 'block';
	}		
	for (val of smoke_in2_unselected) {
		val.style.display = 'block';
	}
}


var drink_in1_unselected = document.getElementsByClassName('drink_in1_unselected');
var drink_in2_unselected = document.getElementsByClassName('drink_in2_unselected');
var drink_in1_selected = document.getElementsByClassName('drink_in1_selected');
var drink_in2_selected = document.getElementsByClassName('drink_in2_selected');

function select_drink_1() {
	for (val of drink_in1_selected) {
		val.style.display = 'block';
	}		
	for (val of drink_in2_selected) {
		val.style.display = 'none';
	}
	for (val of drink_in1_unselected) {
		val.style.display = 'none';
	}		
	for (val of drink_in2_unselected) {
		val.style.display = 'block';
	}
}

function select_drink_2() {
	for (val of drink_in2_selected) {
		val.style.display = 'block';
	}		
	for (val of drink_in1_selected) {
		val.style.display = 'none';
	}
	for (val of drink_in2_unselected) {
		val.style.display = 'none';
	}		
	for (val of drink_in1_unselected) {
		val.style.display = 'block';
	}
}

function deselect_drink() {
	for (val of drink_in1_selected) {
		val.style.display = 'none';
	}		
	for (val of drink_in2_selected) {
		val.style.display = 'none';
	}
	for (val of drink_in1_unselected) {
		val.style.display = 'block';
	}		
	for (val of drink_in2_unselected) {
		val.style.display = 'block';
	}
}


var sex_in1_unselected = document.getElementsByClassName('sex_in1_unselected');
var sex_in2_unselected = document.getElementsByClassName('sex_in2_unselected');
var sex_in1_selected = document.getElementsByClassName('sex_in1_selected');
var sex_in2_selected = document.getElementsByClassName('sex_in2_selected');

function select_sex_1() {
	for (val of sex_in1_selected) {
		val.style.display = 'block';
	}		
	for (val of sex_in2_selected) {
		val.style.display = 'none';
	}
	for (val of sex_in1_unselected) {
		val.style.display = 'none';
	}		
	for (val of sex_in2_unselected) {
		val.style.display = 'block';
	}
}

function select_sex_2() {
	for (val of sex_in2_selected) {
		val.style.display = 'block';
	}		
	for (val of sex_in1_selected) {
		val.style.display = 'none';
	}
	for (val of sex_in2_unselected) {
		val.style.display = 'none';
	}		
	for (val of sex_in1_unselected) {
		val.style.display = 'block';
	}
}

function deselect_sex() {
	for (val of sex_in1_selected) {
		val.style.display = 'none';
	}		
	for (val of sex_in2_selected) {
		val.style.display = 'none';
	}
	for (val of sex_in1_unselected) {
		val.style.display = 'block';
	}		
	for (val of sex_in2_unselected) {
		val.style.display = 'block';
	}
}