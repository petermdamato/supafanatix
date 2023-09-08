import os

# Directory containing the JPG files
directory = 'your_directory_path_here'

# Iterate over JPG files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.jpg'):
        file_path = os.path.join(directory, filename)
        # Remove file extension to get the variable name
        variable_name = os.path.splitext(filename)[0]
        # Print the require statement
        print(f'const {variable_name} = require(\'./images/{filename}\');')

# Replace 'your_directory_path_here' with the path to your JPG files directory.