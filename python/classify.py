import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics 
from joblib import load

test_dataset_path = '../data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
model_path = '../data/kaggle_disease_symptom_prediction/model.joblib'

# get stored model and test data
clf = load(model_path)
dataframe_test = pd.read_csv(test_dataset_path)
y_test = dataframe_test['label']
x_test = dataframe_test.drop('label', axis=1)

#use stored model to predict test data
y_pred = clf.predict(x_test)
print("ACCURACY OF THE MODEL: ", metrics.accuracy_score(y_test, y_pred))

#use stored model to predict test instance and return a score from random forest classifier
# Given a list of symptoms, return a list of possible diseases and a list of the corresponding scores
symptoms_list = ["itching", "skin_rash", "nodal_skin_eruptions","dischromic__patches"]
# ["itching", "nodal_skin_eruptions","dischromic__patches"]
# ["altered sensorium"]
# ["continuous_sneezing", "chills", "cough", "chest_pain", "high_fever"]

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

print(symptoms_array[0:8])
symptoms_df = pd.DataFrame(symptoms_array ,index=list(dataframe_test.columns.values)[1:]).T
#use stored model to predict test instance (top result)
prediction = clf.predict(symptoms_df)
print("Predicted disease: ", prediction)

# use stored model to get a score for each class from random forest classifier
score = clf.predict_proba(symptoms_df)
print("Score: ", score)

# Create output arrays containing the top five predicted diseases and the corresponding scores
top_diseases = []
top_scores = []

