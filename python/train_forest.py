import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn import metrics 
from joblib import dump

full_dataset_path = '../data/kaggle_disease_symptom_prediction/parsed_dataset.csv'
test_dataset_path = '../data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
train_dataset_path = '../data/kaggle_disease_symptom_prediction/parsed_dataset_train.csv'
model_path = '../data/kaggle_disease_symptom_prediction/model.joblib'

#read in the data
dataframe_full = pd.read_csv(full_dataset_path)
dataframe_test = pd.read_csv(test_dataset_path)
dataframe_train = pd.read_csv(train_dataset_path)
print(dataframe_full.head())

#create test and train sets
# https://stackoverflow.com/questions/34946129/how-to-create-a-scikit-learn-dataset#34946901
y_train = dataframe_train['label']
x_train = dataframe_train.drop('label', axis=1)
y_test = dataframe_test['label']
x_test = dataframe_test.drop('label', axis=1)

#Create train and evaluate random forest classifier
clf = RandomForestClassifier(n_estimators = 100)
clf.fit(x_train, y_train)
y_pred = clf.predict(x_test)
print("ACCURACY OF THE MODEL: ", metrics.accuracy_score(y_test, y_pred))

#Save the model
# https://scikit-learn.org/stable/model_persistence.html
dump(clf, model_path)

##later, load the model with:
#clf = load('model.joblib')