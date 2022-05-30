import sys
import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn import metrics 
from joblib import load

test_dataset_path = '../../SymptoMonitor/data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
model_path = './model.joblib'

# get stored model and test data (for headers)
clf = load(model_path)
# TODO: get list of labels from model directly (clf.labels_ not working?), or hard-code the list in
dataframe_test = pd.read_csv(test_dataset_path)

# Get symptoms list from js
symptoms_list = []
for input in sys.argv[1:]:
    symptoms_list.append(input) #.replace(' " ' , " ")

# ["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"]
# ["itching", "nodal_skin_eruptions","dischromic__patches"]
# ["altered sensorium"]
# ["continuous_sneezing", "chills", "cough", "chest_pain", "high_fever"]

#process symptoms list to get dataframe containing a one for each symptom present, and the rest zeros
symptoms_array = []
symptom_set = list(dataframe_test.columns.values)[1:]
for symptom in symptom_set:
    found = False
    for s in symptoms_list:
        if symptom == s:
            symptoms_array.append(1)
            found = True
            break
    if not found:
        symptoms_array.append(0)
symptoms_df = pd.DataFrame(symptoms_array ,index=symptom_set).T

# Given a list of symptoms, return a list of the top 5 possible diseases and their corresponding scores, sorted by score

# #use stored model to predict test instance (top result)
# prediction = clf.predict(symptoms_df)
# print("Predicted disease: ", prediction)

# use stored model to get a score for each disease from random forest classifier
diseases_list = clf.classes_
scores = clf.predict_proba(symptoms_df).tolist()[0]
# Create output arrays containing the top five predicted diseases and the corresponding scores
top5indexes = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:5]
top_diseases = []
top_scores = []
for index in top5indexes:
    top_diseases.append(diseases_list[index])
    top_scores.append(scores[index])

print(top_diseases)
print(top_scores)
