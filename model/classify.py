import sys
import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn import metrics 
from joblib import load

#Path is with respect to server.js folder
test_dataset_path = './data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'
model_path = './model/model.joblib'
condensed_dataset_path = './data/kaggle_disease_symptom_prediction/condensed_dataset.csv'

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

# For some datasets the classifier is very confident about one disease
# and gives random results for the others (with score zero).
# In this case, look for diseaseses with similar symptoms
n_zero_scores = 0
for i in range(len(top_scores)):
    if top_scores[i] == 0.0:
        n_zero_scores += 1

if(n_zero_scores >= len(top_diseases)-1):
    condensed_dataset = pd.read_csv(condensed_dataset_path)
    n_matches_list = [0] * condensed_dataset.shape[1]
    for i in range(condensed_dataset.shape[1]):
        n_matches_list[i] = len(set(condensed_dataset.iloc[:,i]).intersection(set(symptoms_list)))
    # print(n_matches_list)
    top4indexes = sorted(range(len(n_matches_list)), key=lambda i: n_matches_list[i], reverse=True)[:(len(top_diseases)-1)]
    # top4indexes = sorted(range(len(n_matches_list)), key=lambda i: n_matches_list[i], reverse=True)[:4]

    top_alt_diseases = []
    top_alt_scores = []
    for index in top4indexes:
        top_alt_diseases.append(condensed_dataset.iloc[index][0])
        top_alt_scores.append(n_matches_list[index]/len(symptoms_list)*1/len(top_diseases))
    for i in range(len(top_alt_diseases)):
        if top_alt_diseases[i] in top_diseases:
            if(i+1 < len(top_diseases)-1):
                top_alt_diseases[i] = top_diseases[i+1]
                top_alt_scores[i] = top_scores[i+1]
            else:
                top_alt_diseases[i] = top_diseases[i]
                top_alt_scores[i] = top_scores[i]
    # print(top_alt_diseases)
    # print(top_alt_scores)

    top_diseases[1:] = top_alt_diseases
    top_scores[1:] = top_alt_scores
    top_scores[0] = top_scores[0]-sum(top_alt_scores)


print(top_diseases)
print(top_scores)

# # In this case, find more reasonable results by looking at adjacent leaf nodes
# n_zero_scores = 0
# for i in range(len(top_scores)):
#     if top_scores[i] == 0.0:
#         n_zero_scores += 1

# if(n_zero_scores > 1):
#     tree = clf.estimators_[0] # first tree in the collection of fitted sub-estimators.
#     decision_path = tree.decision_path(symptoms_df.values) # the decision path for the test instance
#     # ^ A non zero element in the indicator matrix at position (i, j) indicates that the sample i goes through the node j. 
#     # Or, for one sample i, the positions of the non zero elements in row i of the indicator matrix designate the ids of the nodes that sample goes through
#     # get last four ids:
#     last_four_ids = decision_path.indices[-5:-1]
#     last_four_feature_indexes = []
#     last_four_features = []
#     for id in last_four_ids:
#         last_four_feature_indexes.append(tree.tree_.feature[id])
#     for index in last_four_feature_indexes:
#         last_four_features.append(dataframe_test.columns[index])
#     leaf_id = tree.apply(symptoms_df.values) # returns an array of the node ids of the leaf[ves] reached by each sample[s] of interest.

#     # print(decision_path)
#     print(last_four_ids)
#     print(last_four_features)
#     print(last_four_feature_indexes)
#     print(leaf_id)
#     print(dataframe_test.columns[tree.tree_.feature[leaf_id]+1])





##################3
# https://scikit-learn.org/stable/auto_examples/tree/plot_unveil_tree_structure.html#sphx-glr-auto-examples-tree-plot-unveil-tree-structure-py
# import numpy as np
# tree = clf.estimators_[0]
# n_nodes = tree.tree_.node_count
# children_left = tree.tree_.children_left
# children_right = tree.tree_.children_right
# feature = tree.tree_.feature
# threshold = tree.tree_.threshold

# node_depth = np.zeros(shape=n_nodes, dtype=np.int64)
# is_leaves = np.zeros(shape=n_nodes, dtype=bool)

# node_indicator = tree.decision_path(symptoms_df.values)
# leaf_id = tree.apply(symptoms_df.values)

# sample_id = 0
# # obtain ids of the nodes `sample_id` goes through, i.e., row `sample_id`
# node_index = node_indicator.indices[
#     node_indicator.indptr[sample_id] : node_indicator.indptr[sample_id + 1]
# ]

# print("Rules used to predict sample {id}:\n".format(id=sample_id))
# for node_id in node_index:
#     # continue to the next node if it is a leaf node
#     if leaf_id[sample_id] == node_id:
#         continue

#     # check if value of the split feature for sample 0 is below threshold
#     if symptoms_df.values[sample_id, feature[node_id]] <= threshold[node_id]:
#         threshold_sign = "<="
#     else:
#         threshold_sign = ">"

#     print(
#         "decision node {node} : (symptoms_df.values[{sample}, {feature}] = {value}) "
#         "{inequality} {threshold})".format(
#             node=node_id,
#             sample=sample_id,
#             feature=feature[node_id],
#             value=symptoms_df.values[sample_id, feature[node_id]],
#             inequality=threshold_sign,
#             threshold=threshold[node_id],
#         )
#     )
