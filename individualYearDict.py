import csv

yearDict = {}

with open('movies.csv', mode ='r')as file:
  csvFile = csv.reader(file)
  for line in csvFile:
      yr = line[4]
      if yearDict.__contains__(yr):
          yearDict[yr] = yearDict[yr] + 1
      else:
          yearDict[yr] = 1

print(yearDict)
