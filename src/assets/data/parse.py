import os
import json

def main():
    script_directory = os.path.dirname(os.path.abspath(__file__))
    json_files = [f for f in os.listdir(script_directory) if f.endswith('.json')]

    descriptor_values = {}
    count = {}

    for file_name in json_files:
        with open(file_name, 'r') as json_file:
            data = json.load(json_file)["data"]
            for entry in data:
                for key, value in entry.items():
                    if key == "descriptor":
                        if value in descriptor_values:
                            descriptor_values[value] += entry["value"]
                            count[value] += 1
                        else:
                            descriptor_values[value] = entry["value"]
                            count[value] = 1

    averages = {descriptor: value / count[descriptor] for descriptor, value in descriptor_values.items()}

    print("Average value of each descriptor:")
    for descriptor, avg_value in averages.items():
        print(f"{descriptor}: {avg_value:.2f}")

if __name__ == "__main__":
    main()