import csv

# File path
file_path = '/var/log/nmap_results.log'

# Initialize an empty list to hold the dictionaries
data_list = []

# Open the file
with open(file_path, mode='r') as file:
    # Create a CSV reader object
    csv_reader = csv.DictReader(file, delimiter=';')
    
    # Iterate through each row and append the dictionary to the list
    for row in csv_reader:
        data_list.append(row)

# Print the result (for demonstration purposes)
for entry in data_list:
    print(entry)

# You can now use data_list for further processing

