import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics 
from joblib import load
import numpy as np
import csv
import random
import warnings
warnings.filterwarnings("ignore")

test_dataset_path = '../data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
model_path = '../data/kaggle_disease_symptom_prediction/model.joblib'

# get stored model and test data
clf = load(model_path)
dataframe_test = pd.read_csv(test_dataset_path)
y_test = dataframe_test['label']
x_test = dataframe_test.drop('label', axis=1)

#use stored model to predict test data
y_pred = clf.predict(x_test)

#use stored model to predict test instance and return a score from random forest classifier
# Given a list of symptoms, return a list of possible diseases and a list of the corresponding scores
symptoms_list = ["itching", "skin rash", "nodal skin eruptions", "cough"]
# ["itching", "nodal_skin_eruptions","dischromic__patches"]
# ["altered sensorium"]
# ["continuous_sneezing", "chills", "cough", "chest_pain", "high_fever"]

for i, s in enumerate(symptoms_list):
    symptoms_list[i] = symptoms_list[i].replace(' ', '_')

#process symptoms list
symptoms_array = []
for symptom in list(dataframe_test.columns.values)[1:]:
    found = False
    for s in symptoms_list:
        if symptom == s:
            symptoms_array.append(1)
            found = True
            break
    if not found:
        symptoms_array.append(0)

symptoms_df = pd.DataFrame(symptoms_array ,index=list(dataframe_test.columns.values)[1:]).T
#use stored model to predict test instance (top result)
#prediction = clf.predict(symptoms_df)

# use stored model to get a score for each class from random forest classifier
score = clf.predict_proba(symptoms_df)

# Create output arrays containing the top three predicted diseases and the corresponding scores
top_idx = np.argsort(score[0])[-3:]
top_idx = top_idx[::-1]
top_scores = [int(score[0][i]*100) for i in top_idx]
top_diseases = [clf.classes_[i].replace('_', ' ') for i in top_idx]


# Generate quick list based on symptoms added
dataset_filename = "../data/kaggle_disease_symptom_prediction/dataset.csv"

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
quick_list = [symptom for symptom in quick_list if symptom not in symptoms_list]
n = min(6, len(quick_list))
quick_list = random.sample(quick_list, n)
quick_list = [quick_list_symptom.replace('_', ' ') for quick_list_symptom in quick_list]


# Patient Distribution for Each Disease
dataset_filename = "../data/kaggle_disease_symptom_prediction/parsed_dataset_train.csv"
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
    for symptom in symptoms_list:
        symptom_idx = symptom_labels.index(symptom.replace(' ', '_'))
        symptom_cnt = symptoms_count_dict[disease][symptom_idx]
        symptom_pc = symptom_cnt/disease_cnt*100
        symptom_pc_list.append(symptom_pc)
    symptom_pc_dict[disease] = symptom_pc_list

max_dist = max(symptom_pc_dict[top_diseases[0]])
max_idx = symptom_pc_dict[top_diseases[0]].index(max_dist)
max_symptom = symptoms_list[max_idx]
max_dist = int(max_dist)

# Description for diseases
dataset_filename = "../data/kaggle_disease_symptom_prediction/symptom_Description.csv"
dataset_fields = []
description_dict = {}

with open(dataset_filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile,skipinitialspace=True)
    dataset_fields = next(csvreader)
    for row in csvreader:
        description_dict[row[0]] = row[1]

# Precautions for diseases
dataset_filename = "../data/kaggle_disease_symptom_prediction/symptom_precaution.csv"
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


#Final Results to be used in Javascript

# In the search page
print("Quick List:", quick_list)
print("Likely Prediction:", top_diseases[0])
print("Best Matching Symptom:", max_symptom)

# In the results page
print("Top Diseases:", top_diseases)
print("Top Scores:", top_scores)
print("Best Matching Symptom:", max_symptom)
print("Best Matching Symptom Percentage:", max_dist)

# Distribution plot for each disease, Description, Precautions
disease = top_diseases[0]
print("Description:", description_dict[disease])
print("Precaution 1:", precaution_dict[disease][0])
print("Precaution 2:", precaution_dict[disease][1])
print("Precaution 3:", precaution_dict[disease][2])
print("Precaution 4:", precaution_dict[disease][3])
print("Symptom Distribution for top disease:", symptom_pc_dict[disease])
print("Symptoms contributing to disease: ", symptoms_per_disease)
print("Contribution of Symptoms: ", importance)