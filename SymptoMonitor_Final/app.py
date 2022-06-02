import json
from flask import request, jsonify
from flask import Flask, render_template
import time
app = Flask(__name__)


symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze"];
selected_symptom_list = []
selected_symptom_count = 0
quick_list = []
top_diseases = []
max_symptom = ''


import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics 
from joblib import load
import numpy as np
import csv
import random
import warnings
warnings.filterwarnings("ignore")

test_dataset_path = 'data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
model_path = 'data/kaggle_disease_symptom_prediction/model.joblib'

# get stored model and test data
clf = load(model_path)
dataframe_test = pd.read_csv(test_dataset_path)
y_test = dataframe_test['label']
x_test = dataframe_test.drop('label', axis=1)


def ml_processing():
    global selected_symptom_list
    global quick_list
    global top_diseases
    global top_scores
    global max_symptom
    global max_dist
    global description_dict
    global precaution_dict
    global symptom_pc_dict
    global symptoms_per_disease
    global importance

    for i, s in enumerate(selected_symptom_list):
        selected_symptom_list[i] = selected_symptom_list[i].replace(' ', '_')

    #process symptoms list
    symptoms_array = []
    for symptom in list(dataframe_test.columns.values)[1:]:
        found = False
        for s in selected_symptom_list:
            if symptom == s:
                symptoms_array.append(1)
                found = True
                break
        if not found:
            symptoms_array.append(0)

    symptoms_df = pd.DataFrame(symptoms_array ,index=list(dataframe_test.columns.values)[1:]).T

    score = clf.predict_proba(symptoms_df)

    # Create output arrays containing the top three predicted diseases and the corresponding scores
    top_idx = np.argsort(score[0])[-3:]
    top_idx = top_idx[::-1]
    top_scores = [int(score[0][i]*100) for i in top_idx]
    top_diseases = [clf.classes_[i].replace('_', ' ') for i in top_idx]


    # Generate quick list based on symptoms added
    dataset_filename = "data/kaggle_disease_symptom_prediction/dataset.csv"

    dataset_fields = []
    symptoms_list_all = []
    disease_list = []

    with open(dataset_filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile,skipinitialspace=True)
        dataset_fields = next(csvreader)
        for row in csvreader:
            already_in_disease_list = False
            if (row[0] in disease_list):
                already_in_disease_list = True
            else:
                disease_list.append(row[0])
            if(already_in_disease_list == False):
                symptoms_list_one = []
                for i in range(1,len(row)):
                    if row[i] != "":
                        symptoms_list_one.append(row[i])
                symptoms_list_all.append(symptoms_list_one)

    disease_index = [disease_list.index(top_disease) for top_disease in top_diseases]
    quick_list = []
    for i in disease_index:
        quick_list.append(symptoms_list_all[i])
    quick_list = sum(quick_list, [])
    quick_list = [symptom for symptom in quick_list if symptom not in selected_symptom_list]
    n = min(4, len(quick_list))
    quick_list = list(set(quick_list))
    quick_list = random.sample(quick_list, n)
    quick_list = [quick_list_symptom.replace('_', ' ') for quick_list_symptom in quick_list]

    # Patient Distribution for Each Disease
    dataset_filename = "data/kaggle_disease_symptom_prediction/parsed_dataset_train.csv"
    dataset_fields = []
    symptoms_count_dict = {}
    disease_count_dict = {}

    for disease in disease_list:
        symptoms_count_dict[disease] = [0]*len(symptoms_array)

    for disease in disease_list:
        disease_count_dict[disease] = 0

    with open(dataset_filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile,skipinitialspace=True)
        dataset_fields = next(csvreader)
        for row in csvreader:
            disease_count_dict[row[0].replace('_', ' ')] += 1
            for i in range(1,len(row)):
                symptoms_count_dict[row[0].replace('_', ' ')][i-1]+=int(row[i])
    symptom_labels = dataset_fields[1:]

    symptom_pc_dict = {}
    disease_idx = [disease_list.index(disease) for disease in top_diseases]
    for disease in top_diseases:
        disease_cnt = disease_count_dict[disease]
        symptom_pc_list = []
        for symptom in selected_symptom_list:
            symptom_idx = symptom_labels.index(symptom.replace(' ', '_'))
            symptom_cnt = symptoms_count_dict[disease][symptom_idx]
            symptom_pc = symptom_cnt/disease_cnt*100
            symptom_pc_list.append(symptom_pc)
        symptom_pc_dict[disease] = symptom_pc_list

    max_dist = max(symptom_pc_dict[top_diseases[0]])
    max_idx = symptom_pc_dict[top_diseases[0]].index(max_dist)
    max_symptom = selected_symptom_list[max_idx].replace('_', ' ')
    max_dist = int(max_dist)

    # Description for diseases
    dataset_filename = "data/kaggle_disease_symptom_prediction/symptom_Description.csv"
    dataset_fields = []
    description_dict = {}

    with open(dataset_filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile,skipinitialspace=True)
        dataset_fields = next(csvreader)
        for row in csvreader:
            description_dict[row[0]] = row[1]

    # Precautions for diseases
    dataset_filename = "data/kaggle_disease_symptom_prediction/symptom_precaution.csv"
    dataset_fields = []
    precaution_dict = {}

    for disease in disease_list:
        precaution_dict[disease] = ['','','','']

    with open(dataset_filename, 'r') as csvfile:
        csvreader = csv.reader(csvfile,skipinitialspace=True)
        dataset_fields = next(csvreader)
        for row in csvreader:
            for i in range(1,len(row)):
                precaution_dict[row[0]][i-1] = row[i]


    # Contribution of each symptom to the final prediction
    importances = clf.feature_importances_
    disease = top_diseases[0]
    disease_index = disease_list.index(disease)
    symptom_idxs = []
    symptoms_per_disease = []
    for symptom in symptoms_list_all[disease_index]:
        symptoms_per_disease.append(symptom.replace('_', ' '))
        symptom_idxs.append(symptom_labels.index(symptom.replace(' ', '_')))
    importance = [importances[symptom_idx] for symptom_idx in symptom_idxs]







@app.route('/')
def index():
    global symptoms
    global selected_symptom_list
    global selected_symptom_count
    symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze"];
    selected_symptom_list = []
    selected_symptom_count = 0
    symptoms = [symptom.replace('_', ' ') for symptom in symptoms]
    selected_symptom_list = [selected_symptom.replace('_', ' ') for selected_symptom in selected_symptom_list]
    return render_template('login.html')

@app.route('/login')
def login():
    global symptoms
    global selected_symptom_list
    global selected_symptom_count
    symptoms = ["itching","skin rash","nodal skin eruptions","continuous sneezing","shivering","chills","joint pain","stomach pain","acidity","ulcers on tongue","muscle wasting","vomiting","burning micturition","spotting  urination","fatigue","weight gain","anxiety","cold hands and feets","mood swings","weight loss","restlessness","lethargy","patches in throat","irregular sugar level","cough","high fever","sunken eyes","breathlessness","sweating","dehydration","indigestion","headache","yellowish skin","dark urine","nausea","loss of appetite","pain behind the eyes","back pain","constipation","abdominal pain","diarrhoea","mild fever","yellow urine","yellowing of eyes","acute liver failure","fluid overload","swelling of stomach","swelled lymph nodes","malaise","blurred and distorted vision","phlegm","throat irritation","redness of eyes","sinus pressure","runny nose","congestion","chest pain","weakness in limbs","fast heart rate","pain during bowel movements","pain in anal region","bloody stool","irritation in anus","neck pain","dizziness","cramps","bruising","obesity","swollen legs","swollen blood vessels","puffy face and eyes","enlarged thyroid","brittle nails","swollen extremeties","excessive hunger","extra marital contacts","drying and tingling lips","slurred speech","knee pain","hip joint pain","muscle weakness","stiff neck","swelling joints","movement stiffness","spinning movements","loss of balance","unsteadiness","weakness of one body side","loss of smell","bladder discomfort","foul smell of urine","continuous feel of urine","passage of gases","internal itching","toxic look (typhos)","depression","irritability","muscle pain","altered sensorium","red spots over body","belly pain","abnormal menstruation","dischromic  patches","watering from eyes","increased appetite","polyuria","family history","mucoid sputum","rusty sputum","lack of concentration","visual disturbances","receiving blood transfusion","receiving unsterile injections","coma","stomach bleeding","distention of abdomen","history of alcohol consumption","fluid overload","blood in sputum","prominent veins on calf","palpitations","painful walking","pus filled pimples","blackheads","scurring","skin peeling","silver like dusting","small dents in nails","inflammatory nails","blister","red sore around nose","yellow crust ooze"];
    selected_symptom_list = []
    selected_symptom_count = 0
    symptoms = [symptom.replace('_', ' ') for symptom in symptoms]
    selected_symptom_list = [selected_symptom.replace('_', ' ') for selected_symptom in selected_symptom_list]
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/add_symptom')
def add_symptom():
    return render_template('add_symptom.html', symptoms=symptoms, selected_symptom_list=selected_symptom_list, selected_symptom_count=selected_symptom_count, quick_list=quick_list, top_diseases=top_diseases, max_symptom=max_symptom)
@app.route('/add_symptom_data', methods=['POST'])
def add_symptom_data():
    output = request.get_json()
    result = json.loads(output)
    global symptoms
    global selected_symptom_list
    global selected_symptom_count
    global quick_list
    global top_diseases
    global max_symptom
    symptoms = result['symptoms']
    selected_symptom_list = result['selected_symptom_list']
    selected_symptom_count = result['selected_symptom_count']
    if(selected_symptom_count>0):
        ml_processing()
    symptoms = [symptom.replace('_', ' ') for symptom in symptoms]
    selected_symptom_list = [selected_symptom.replace('_', ' ') for selected_symptom in selected_symptom_list]
    quick_list = [symptom for symptom in quick_list if symptom not in selected_symptom_list]
    return result

@app.route('/_stuff', methods = ['GET'])
def stuff():
    global max_symptom
    global quick_list
    global top_diseases
    return jsonify(max_symptom=max_symptom, quick_list=quick_list, top_diseases=top_diseases)

@app.route('/results_all')
def results_all():
    global symptoms
    global selected_symptom_list
    global selected_symptom_count
    symptoms = [symptom.replace('_', ' ') for symptom in symptoms]
    selected_symptom_list = [selected_symptom.replace('_', ' ') for selected_symptom in selected_symptom_list]
    return render_template('results_all.html', selected_symptom_list=selected_symptom_list, top_diseases=top_diseases, top_scores=top_scores, max_symptom=max_symptom, max_dist=max_dist)

@app.route('/results_one_1')
def results_one_1():
    return render_template('results_one_1.html', top_diseases=top_diseases, description_dict=description_dict, precaution_dict=precaution_dict, selected_symptom_list=selected_symptom_list, symptom_pc_dict=symptom_pc_dict, symptoms_per_disease=symptoms_per_disease, importance=importance)
@app.route('/results_one_2')
def results_one_2():
    return render_template('results_one_2.html', top_diseases=top_diseases, description_dict=description_dict, precaution_dict=precaution_dict, selected_symptom_list=selected_symptom_list, symptom_pc_dict=symptom_pc_dict, symptoms_per_disease=symptoms_per_disease, importance=importance)
@app.route('/results_one_3')
def results_one_3():
    return render_template('results_one_3.html', top_diseases=top_diseases, description_dict=description_dict, precaution_dict=precaution_dict, selected_symptom_list=selected_symptom_list, symptom_pc_dict=symptom_pc_dict, symptoms_per_disease=symptoms_per_disease, importance=importance)


if __name__ == '__main__':
    app.run(debug=True)
