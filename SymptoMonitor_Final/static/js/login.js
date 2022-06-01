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