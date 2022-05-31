// -------------------------------------
// From Python

top_diseases = ['Fungal infection', 'GERD', 'Bronchial Asthma'];
top_scores = [79, 11, 10];
max_symptom = 'itching';
max_dist = 91;

// -------------------------------------


function open_login() {
	window.location.href = '../html/Login.html';
}

function open_add_sym() {
	window.location.href = '../html/Add_Symptom.html';
}

function open_results_one() {
	window.location.href = '../html/Results_One.html';
}

selected_symptom_list = window.localStorage.getItem('selected_symptom_list').split(',');
console.log(selected_symptom_list);

var disease_1 = document.getElementsByClassName('disease_1');
var disease_2 = document.getElementsByClassName('disease_2');
var disease_3 = document.getElementsByClassName('disease_3');
var score_1 = document.getElementsByClassName('score_1');
var score_2 = document.getElementsByClassName('score_2');
var score_3 = document.getElementsByClassName('score_3');

var symptom_name = document.getElementsByClassName('symptom_name');
var symptom_pc = document.getElementsByClassName('symptom_pc');

for (val of disease_1) {
	val.textContent = top_diseases[0];
}
for (val of disease_2) {
	val.textContent = top_diseases[1];
}
for (val of disease_3) {
	val.textContent = top_diseases[2];
}

var color_list = ["rgb(255,0,0)", "rgb(255,0,0)", "rgb(255,0,0)"];
for (i = 0; i < top_scores.length; i++) {
	val = (100-top_scores[i])*255/100;
	color_list[i] = "rgb(255," + val + ",0)";
}
for (val of score_1) {
	val.textContent = top_scores[0];
	val.style.background = color_list[0];
}
for (val of score_2) {
	val.textContent = top_scores[1];	
	val.style.background = color_list[1];
}
for (val of score_3) {
	val.textContent = top_scores[2];
	val.style.background = color_list[2];
}

for (val of symptom_name) {
	val.textContent = max_symptom;
}
for (val of symptom_pc) {
	val.textContent = max_dist;
}











/*
//Given a list of symptoms, use a rough counting algorithm to determine the most likely disease

[top_diseases, top_scores] = classify(selected_symptom_list);

// Returns a list of diseases and a list that contains, for each disease, the percent of symptoms that are matched in the dataset 
function classify (symptoms_list) {
    // let symptoms_array = DEMOCLASSIFY.symptoms_to_features(symptoms_list);

	//Object containing diseases and their corresponding symptoms
	diseases_covered = {
		"Common Cold": ["continuous sneezing", "chills", "cough", "chest pain", "high fever", "fatigue", "headache", "muscle pain", "congestion", "loss of smell" ,"throat irritation", "runny nose", "swelled lymph nodes"],
		"Pneumonia": ["chills", "cough", "chest pain","high fever","fatigue", "breathlessness","sweating", "malaise", "fast heart rate", "rusty sputum"],
		"Fungal infection": ["itching", "skin rash", "nodal skin eruptions","dischromic  patches"],
		"Allergy": ["continuous sneezing","shivering","chills","watering from eyes"],
		"GERD": ["stomach pain","acidity","ulcers_on_tongue","vomiting","cough","chest pain"],
		"Drug Reaction": ["itching", "skin_rash","stomach pain","burning micturition","spotting urination"],
		"Bronchial Asthma": ["cough","high fever","fatigue", "breathlessness", "mucoid sputum"],
		"Chicken Pox": ["red spots over body","itching", "skin rash","loss of appetite","high fever", "fatigue"]
	}

    let disease_array = ["Common Cold", "Pneumonia", "Fungal infection", "Allergy", "GERD", "Chicken Pox", "Drug Reaction", "Bronchial Asthma"];
    let disease_scores = new Array(8); 
    let disease_percents = new Array(8);
    let final_diseases = [];
    let final_percents = [];
    for (let i=0; i<disease_scores.length; ++i) {
        disease_scores[i] = 0;
        disease_percents[i] = 0;
    }
    //give a score to each disease
    for (let disease in diseases_covered) {
        //find index of disease
        let index = disease_array.indexOf(disease);
        for(let j = 0; j < symptoms_list.length; j++) {
            if (diseases_covered[disease].includes(symptoms_list[j])) {
                disease_scores[index] += 100;
            }
            disease_percents[index] +=100;
        }
    }

    //return the set of diseases with nonzero scores and the percent probability of each
    for(let k = 0; k < disease_scores.length; k++) {
        if(disease_percents[k] != 0) {
            disease_percents[k] = ((disease_scores[k]/disease_percents[k])*100).toFixed(0);
        }
    }

    let unknown_disease = true;
    for(let k = 0; k < disease_array.length; k++) {
        if(disease_percents[k] != 0) {
            unknown_disease = false;
            final_diseases.push(disease_array[k]);
            final_percents.push(disease_percents[k]);
        }
    }
    if(unknown_disease) {
        final_diseases.push("Unknown");
        final_percents.push(0);
    }
	
    console.log(final_diseases);
    console.log(final_percents);
    return [final_diseases, final_percents];
}

//test
// DEMOCLASSIFY.classify(["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"]);
// DEMOCLASSIFY.classify(["itching", "nodal_skin_eruptions","dischromic__patches"]);

*/