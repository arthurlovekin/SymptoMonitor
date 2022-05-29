// Which disease is selected
index = 0;

// -----------------------
// From Python
top_diseases = ['Fungal infection', 'GERD', 'Bronchial Asthma'];

var disease_name = top_diseases[index];
//var disease_dsc = description_dict[disease_name]
var prec_1 = 'bath twice';
var prec_2 = 'use detol or neem in bathing water';
var prec_3 = 'keep infected area dry';
var prec_4 = 'use clean cloths';
//var prec_1 = precaution_dict[disease_name][0];
//var prec_2 = precaution_dict[disease_name][1];
//var prec_3 = precaution_dict[disease_name][2];
//var prec_4 = precaution_dict[disease_name][3];

var symptom_list = ["itching", "skin rash", "nodal skin eruptions", "cough"];
var symptom_pc = [91.83673469387756, 89.79591836734694, 87.75510204081633, 0.0];
//var symptom_pc = symptom_pc_dict[disease];

var symptoms_per_disease = ['itching', 'skin rash', 'nodal skin eruptions', 'dischromic patches'];
var importance = [0.015604675040221085, 0.010030370493923961, 0.00675420593063811, 0.010652613238094088];

// -----------------------

function open_login() {
	window.location.href = '../html/Login.html';
}

function open_results_all() {
	window.location.href = '../html/Results_All.html';
}

var disease_name_class = document.getElementsByClassName('disease_name_class');
for (val of disease_name_class) {
	val.textContent = disease_name;
}

var disease_dsc_class = document.getElementsByClassName('disease_dsc_class');
var disease_dsc = "In humans, fungal infections occur when an invading fungus takes over an area of the body and is too much for the immune system to handle. Fungi can live in the air, soil, water, and plants. There are also some fungi that live naturally in the human body. Like many microbes, there are helpful fungi and harmful fungi.";
for (val of disease_dsc_class) {
	val.textContent = disease_dsc;
}

var precautions = document.getElementsByClassName('precautions');
for (val of precautions) {
	val.textContent = prec_1 + ', ' + prec_2 + ', ' + prec_3 + ', ' + prec_4;
}

function drawChart1() {

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Symptom');
	data.addColumn('number', 'Distribution');
	data.addColumn({ type: 'string', role: 'style' });
	
	var num_sym = symptom_list.length
	data.addRows(num_sym);
	for (let i=0; i<num_sym; i++) {
		data.setCell(i, 0, symptom_list[i]);
		data.setCell(i, 1, symptom_pc[i]);
	}

	var view = new google.visualization.DataView(data);
	view.setColumns([0, 1]);

	var formatter = new google.visualization.NumberFormat({suffix: '%'});
	formatter.format(data, 1);
  
	var options = {
	  chartArea: {'left': 100, 'top': 5, 'bottom':20, 'right': 0, 'width': '100%', 'height': '100%'},
	  backgroundColor: { fill:'transparent' },
	  hAxis: { gridlines: {count: 10}}
	};
	
	var chart = new google.visualization.BarChart(document.getElementById('symptom_chart_1'));
	chart.draw(view, options);

}

google.load("visualization", "1", { 
	packages: ["corechart"], 
	callback: function() { drawChart1(); }
});



function drawChart2() {

	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Symptom');
	data.addColumn('number', 'Importance');
	data.addColumn({ type: 'string', role: 'style' });
	
	var num_sym = symptoms_per_disease.length
	data.addRows(num_sym);
	for (let i=0; i<num_sym; i++) {
		data.setCell(i, 0, symptoms_per_disease[i]);
		data.setCell(i, 1, importance[i]);
	}

	var view = new google.visualization.DataView(data);
	view.setColumns([0, 1]);

	var formatter = new google.visualization.NumberFormat({suffix: '%'});
	formatter.format(data, 1);
  
	var options = {
	  chartArea: {'left': 5, 'top': 5, 'bottom':5, 'right': 5, 'width': '100%', 'height': '100%'},
	  backgroundColor: { fill:'transparent' },
	};
	
	var chart = new google.visualization.PieChart(document.getElementById('symptom_chart_2'));
	chart.draw(view, options);

}

google.load("visualization", "1", { 
	packages: ["corechart"], 
	callback: function() { drawChart2(); }
});
