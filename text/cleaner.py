# Tällä scriptillä poistin frequencies.txt tiedostosta kaikki muut sarakkeet paitsi 
# kunnan, aseman nimen sekä taajuuden.

# importataan csv-moduuli, joka mahdollistaa tiedostojen lukemisen ja kirjoittamisen
import csv

# asetetaan tiedostojen polut muuttujiin, input = sisään tuleva data, output = puhdistettu data
input_file_path = 'frequencies.txt'
output_file_path = 'Cleaned_frequencies.txt'

# Mitkä sarakkeet halutaan säilyttää
desired_columns = ["Kunta", "Aseman nimi", "Taajuus (MHz)"]

# Avataan tiedostot ja luetaan ne. Tässä oli tärkeää valita input encodingiksi latin-1,
# jotta tiedosto saatiin luettua oikein. alkuperäisessä tiedostossa oli ns. "ihme merkkejä".
# Eli luultavasti ääkkösiä.
with open(input_file_path, 'r', encoding='latin-1') as input_file:
    with open(output_file_path, 'w', encoding='utf-8', newline='') as output_file:
        # Luetaan tiedostot. Tässä käytetään DictReaderia
        # Tämän lisäksi tärkeää oli laittaa delimiteriksi tabulaattori, jotta tiedosto saatiin
        # luettua oikein. Alkuperäisessä tiedostossa oli sarakkeiden välissä tabulaattori.
        reader = csv.DictReader(input_file, delimiter='\t')
        writer = csv.writer(output_file, delimiter='\t')

        # Kirjoitetaan headeri
        writer.writerow(desired_columns + [''])

        # kirjoitetaan puhdistettu data
        for row in reader:
            # tarkistetaan, että kaikki desired_columns löytyvät riviltä
            # lisätään perään tyhjä arvo, jotta tiedosto saadaan luettua oikein
            writer.writerow([row[column] for column in desired_columns] + [''])  

# ilmoitetaan, että data on puhdistettu ja tallennettu
print(f"Cleaned data saved to {output_file_path}")
