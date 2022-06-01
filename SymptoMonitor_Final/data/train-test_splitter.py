import csv
import random

# make sure you're in the full project folder
input_file = './data/kaggle_disease_symptom_prediction/parsed_dataset.csv'
output_file_train = './data/kaggle_disease_symptom_prediction/parsed_dataset_train.csv'
output_file_test = './data/kaggle_disease_symptom_prediction/parsed_dataset_test.csv'

with open(input_file, 'r') as csvfile, \
    open(output_file_train, 'w', newline='') as csvfile_train, \
    open(output_file_test, 'w', newline='') as csvfile_test:
    
    # creating a csv reader object
    csvreader = csv.reader(csvfile,skipinitialspace=True)
    csv_writer_train = csv.writer(csvfile_train, delimiter=',')
    csv_writer_test = csv.writer(csvfile_test, delimiter=',')

    # extracting field names through first row
    fields = next(csvreader)
    csv_writer_train.writerow(fields)
    csv_writer_test.writerow(fields)

    # write data to either train or test file
    for row in csvreader:
        if random.random() < 0.8:
            csv_writer_train.writerow(row)
        else:
            csv_writer_test.writerow(row)
