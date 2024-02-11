# Import the csv module for reading and writing files
import csv

# Define file paths for input and output
input_file_path = 'frequencies.txt'
output_file_path = 'Cleaned_frequencies.txt'

# Specify which columns to keep
desired_columns = ["Kunta", "Aseman nimi", "Taajuus (MHz)"]

# Open the input and output files
with open(input_file_path, 'r', encoding='latin-1') as input_file:
    with open(output_file_path, 'w', encoding='utf-8', newline='') as output_file:
        # Read the input file
        reader = csv.DictReader(input_file, delimiter='\t')
        # Create a writer object for the output file with desired columns
        writer = csv.writer(output_file, delimiter='\t')

        # Write the header
        writer.writerow(desired_columns + [''])

        # Write cleaned data
        for row in reader:
            # Write data from desired columns
            writer.writerow([row[column] for column in desired_columns] + [''])  # Add an empty cell after specified columns

# Print a message indicating that the data has been cleaned and saved
print(f"Cleaned data saved to {output_file_path}")
