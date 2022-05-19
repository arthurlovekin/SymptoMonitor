function open_login() {
	window.location.href = '../html/Login.html';
}

function open_add_sym() {
	window.location.href = '../html/Add_Symptom.html';
}

var disease_1 = document.getElementsByClassName('disease_1');
var disease_2 = document.getElementsByClassName('disease_2');
var disease_3 = document.getElementsByClassName('disease_3');
var score_1 = document.getElementsByClassName('score_1');
var score_2 = document.getElementsByClassName('score_2');
var score_3 = document.getElementsByClassName('score_3');

var disease_list = ["COVID-19", "Common Cold", "Flu"];

for (val of disease_1) {
	val.textContent = disease_list[0];
}

for (val of disease_2) {
	val.textContent = disease_list[1];
}

for (val of disease_3) {
	val.textContent = disease_list[2];
}

var score_list = ["80", "55", "20"];
var color_list = ["rgb(255,0,0)", "rgb(255,0,0)", "rgb(255,0,0)"];

for (i = 0; i < score_list.length; i++) {
	val = (100-score_list[i])*255/100;
	color_list[i] = "rgb(255," + val + ",0)";
}

for (val of score_1) {
	val.textContent = score_list[0];
	val.style.background = color_list[0];
}

for (val of score_2) {
	val.textContent = score_list[1];	
	val.style.background = color_list[1];
}

for (val of score_3) {
	val.textContent = score_list[2];
	val.style.background = color_list[2];
}
