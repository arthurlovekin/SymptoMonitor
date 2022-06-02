import csv
# Parse the dataset from Kaggle into the correct csv format for JS Model.

# csv source file name (make sure you're in full prpoject folder)
dataset_filename = "./data/kaggle_disease_symptom_prediction/dataset.csv"
new_filename = "./data/kaggle_disease_symptom_prediction/condensed_dataset.csv"

dataset_fields = []
symptom_file_fields = []
symptoms_list = []
dataset_rows = []

# read in dataset csv file
with open(dataset_filename, 'r') as csvdataset, \
    open(new_filename, 'w', newline='') as csvcondensed:
    # creating a csv reader object
    csvreader = csv.reader(csvdataset,skipinitialspace=True)
    # creating a csv writer object 
    csvwriter = csv.writer(csvcondensed) 

    # extracting field names through first row
    csvwriter.writerow(next(csvreader))

    # extracting each data row one by one
    seen_diseases = []
    for row in csvreader:
        row[0] = row[0].strip()
        row[0] = row[0].replace(" ", "_")
        #if you haven't seen this disease before, add row to the new csv file
        seen = False
        for disease in seen_diseases:
            if disease == "": 
                continue
            if disease == row[0]:
                seen = True
                break
        if not seen:
            csvwriter.writerow(row)
            seen_diseases.append(row[0])