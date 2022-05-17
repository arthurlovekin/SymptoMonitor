import csv
# Parse the dataset from Kaggle into the correct csv format for JS Model.

# csv source file name
dataset_filename = "./kaggle_disease_symptom_prediction/dataset.csv"
symptoms_list_filename = "./kaggle_disease_symptom_prediction/Symptom-severity.csv"
new_filename = "./kaggle_disease_symptom_prediction/parsed_dataset.csv"

dataset_fields = []
symptom_file_fields = []
symptoms_list = []
dataset_rows = []

# read in dataset csv file
with open(dataset_filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile,skipinitialspace=True)

    # extracting field names through first row
    dataset_fields = next(csvreader)

    # extracting each data row one by one
    for row in csvreader:
        # add symptoms to symptoms list
        for i in range(1,len(row)):
            #Remove all whitespace from each symptom of the row:
            row[i] = row[i].replace(" ", "_")

            already_in_list = False
            for symptom in symptoms_list:
                if symptom == row[i]:
                    already_in_list = True
                    break
            if not already_in_list:
                if row[i] != "":
                    symptoms_list.append(row[i])

        dataset_rows.append(row)



# #this doesn't contain all symptoms
# # read in symptoms csv file
# with open(symptoms_list_filename, 'r') as csvfile:
# 	# creating a csv reader object
# 	csvreader = csv.reader(csvfile,skipinitialspace=True)
	
# 	# extracting field names through first row
# 	symptom_file_fields = next(csvreader)

# 	# extracting each data row one by one
# 	for row in csvreader:
# 		symptoms_list.append(row[0])


# writing to new csv file 
with open(new_filename, 'w', newline='') as csvfile: 
    # creating a csv writer object 
    csvwriter = csv.writer(csvfile) 
        
    # write fields names row 
    new_fields = symptoms_list
    new_fields.insert(0, 'label')
    csvwriter.writerow(new_fields) 
        
    # writing the data rows 
    for row in dataset_rows:
        new_row = [row[0].replace(" ", "_")]
        for symptom in symptoms_list:
            if symptom == "label":
                continue
            found = False
            for s in row[1:]:
                if s == symptom:
                    new_row.append(1)
                    found = True
                    break
            if not found:
                new_row.append(0)
        csvwriter.writerow(new_row)



## printing the field names
# print('Field names are:' + ', '.join(field for field in fields))

# # printing first 5 rows
# print('\nFirst 5 rows are:\n')
# for row in rows[:5]:
# 	# parsing each column of a row
# 	for col in row:
# 		print("%10s"%col,end=" "),
# 	print('\n')