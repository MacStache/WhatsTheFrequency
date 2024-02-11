# WhatsTheFrequency
What's The Frequency is a web application that allows the user to find the radio frequencies available 
at the location that they are at right now. The site uses a script to parse the contents of a text file into a table, 
which hosts all the publicly available radio frequencies in Finland.

The frequencies have been collected from the 
[publicly available database](https://www.traficom.fi/en/communications/tv-and-radio/radio-stations-finland) of 
[Traficom](https://www.traficom.fi/en), the Finnish Transport and Communications Agency.

The frequencies can be downloaded as a [text file](https://github.com/MacStache/WhatsTheFrequency/blob/main/text/frequencies.txt) 
from the [Traficom website](https://www.traficom.fi/en/communications/tv-and-radio/radio-stations-finland).
The downloaded file included a lot of data that is unnecessary for this project, which means that it needed to be cleaned. 
The cleaning was done using a [Python script](https://github.com/MacStache/WhatsTheFrequency/blob/main/text/cleaner.py).
The resulting [text file](https://github.com/MacStache/WhatsTheFrequency/blob/main/text/cleaned_frequencies.txt) 
only includes the locations, names and frequencies of the radio stations.

The frequencies table includes a search bar that allows the user to search for a specific location which will then be used to filter the frequencies.
The site also includes an automated script that will add a link to the stations website. The link table was stripped from the cleaned frequencies text file and 
ran again through a modified [Python script](https://github.com/MacStache/WhatsTheFrequency/blob/main/text/fetcher.py) that removes everything but 
the station names from [the file](https://github.com/MacStache/WhatsTheFrequency/blob/main/text/stations_list.txt). 
It also removes duplicates which made the link table easier to manage. 

The site also includes a favorites page that allows the user to add their favorite stations to a list. The list is stored in the local storage of the users browser.
The functionality also includes a button that allows the user to remove the station from the list, as well as unchecking the checkbox in the frequencies table. 

The site is a final project for the course "Web Applications" at [Oulu University of Applied Sciences](https://oamk.fi/en/).
