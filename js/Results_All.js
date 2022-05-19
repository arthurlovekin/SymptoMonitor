function open_login() {
	window.location.href = '../html/Login.html';
}

function open_add_sym() {
	window.location.href = '../html/Add_Symptom.html';
}

selected_symptom_list = window.localStorage.getItem('selected_symptom_list').split(',');

[disease_list, score_list] = classify(selected_symptom_list);



var disease_1 = document.getElementsByClassName('disease_1');
var disease_2 = document.getElementsByClassName('disease_2');
var disease_3 = document.getElementsByClassName('disease_3');
var score_1 = document.getElementsByClassName('score_1');
var score_2 = document.getElementsByClassName('score_2');
var score_3 = document.getElementsByClassName('score_3');

//var disease_list = ["COVID-19", "Common Cold", "Flu"];

for (val of disease_1) {
	val.textContent = disease_list[0];
}

for (val of disease_2) {
	val.textContent = disease_list[1];
}

for (val of disease_3) {
	val.textContent = disease_list[2];
}

//var score_list = ["80", "55", "20"];
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



//Given a list of symptoms, use a rough counting algorithm to determine the most likely disease


// Returns a list of diseases and a list that contains, for each disease, the percent of symptoms that are matched in the dataset 
function classify (symptoms_list) {
    // let symptoms_array = DEMOCLASSIFY.symptoms_to_features(symptoms_list);

	//Object containing diseases and their corresponding symptoms
	diseases_covered = {
		"Fungal_infection": ["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"],
		"Allergy": ["continuous_sneezing","shivering","chills","watering_from_eyes"],
		"GERD": ["stomach_pain","acidity","ulcers_on_tongue","vomiting","cough","chest_pain"],
		"Drug_Reaction": ["itching", "skin_rash","stomach_pain","burning_micturition","spotting__urination"],
		"Bronchial_Asthma": ["cough","high_fever","fatigue", "breathlessness", "mucoid_sputum"],
		"Chicken_Pox": ["red_spots_over_body","itching", "skin_rash","loss_of_appetite","high_fever", "fatigue"],
		"Common_Cold": ["continuous_sneezing", "chills", "cough", "chest_pain", "high_fever", "fatigue", "headache", "muscle_pain", "congestion", "loss_of_smell" ,"throat_irritation", "runny_nose", "swelled_lymph_nodes"],
		"Pneumonia": ["chills", "cough", "chest_pain",,"high_fever","fatigue", "breathlessness","sweating", "malaise", "fast_heart_rate", "rusty_sputum"]
	}

    let disease_array = ["Fungal_infection", "Allergy", "GERD", "Drug_Reaction", "Bronchial_Asthma", "Chicken_Pox", "Common_Cold", "Pneumonia"];
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
        final_percents.push(100);
    }

    // console.log(final_diseases);
    // console.log(final_percents);
    return [final_diseases, final_percents];
}

//test
// DEMOCLASSIFY.classify(["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"]);
// DEMOCLASSIFY.classify(["itching", "nodal_skin_eruptions","dischromic__patches"]);