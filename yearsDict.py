# Python file written to parse movies.csv to build a dictionary object
# of release years for the pie chart


import csv

# helper function to look up release year band for input year
def lookUpYearBand(yr):
    band20 = ["1920", "1921", "1922", "1923", "1924"];
    band25 = ["1925", "1926", "1927", "1928", "1929"];
    band30 = ["1930", "1931", "1932", "1933", "1934"];
    band35 = ["1935", "1936", "1937", "1938", "1939"];
    band40 = ["1940", "1941", "1942", "1943", "1944"];
    band45 = ["1945", "1946", "1947", "1948", "1949"];
    band50 = ["1950", "1951", "1952", "1953", "1954"];
    band55 = ["1955", "1956", "1957", "1958", "1959"];
    band60 = ["1960", "1961", "1962", "1963", "1964"];
    band65 = ["1965", "1966", "1967", "1968", "1969"];
    band70 = ["1970", "1971", "1972", "1973", "1974"];
    band75 = ["1975", "1976", "1977", "1978", "1979"];
    band80 = ["1980", "1981", "1982", "1983", "1984"];
    band85 = ["1985", "1986", "1987", "1988", "1989"];
    band90 = ["1990", "1991", "1992", "1993", "1994"];
    band95 = ["1995", "1996", "1997", "1998", "1999"];
    band00 = ["2000", "2001", "2002", "2003", "2004"];
    band05 = ["2005", "2006", "2007", "2008", "2009"];
    band10 = ["2010", "2011", "2012", "2013", "2014"];
    band15 = ["2015", "2016", "2017", "2018", "2019", "2020"];

    options = [band20, band25, band30, band35, band40, band45, band50, band55, band60, band65,
                     band70, band75, band80, band85, band90, band95, band00, band05, band10, band15]

    year_band_labels = ["1920-1924", "1925-1929", "1930-1934", "1935-1939", "1940-1944", "1945-1949", "1950-1954", "1955-1959",
                       "1960-1964", "1965-1969", "1970-1974", "1975-1979", "1980-1984", "1985-1989", "1990-1994", "1995-1999",
                       "2000-2004", "2005-2009", "2010-2014", "2015-2020", "Other"]

    for x in range(len(options)):
        if yr in options[x]:
            return year_band_labels[x]


    return "Other"


# initialize dictionary object
yearsDict = {}

# parse data file to build dictionary
with open('movies.csv', mode ='r')as file:
  csvFile = csv.reader(file)
  for line in csvFile:
      yr = line[4]
      yrBand = lookUpYearBand(yr)
      if yearsDict.__contains__(yrBand):
          yearsDict[yrBand] = yearsDict[yrBand] + 1
      else:
          yearsDict[yrBand] = 1




print(yearsDict)
