# Tällä scriptillä poistin frequencies.txt tiedostosta kaikki muut sarakkeet paitsi aseman nimen.
# sekä lisäsin ' -hapsut aseman nimen ympärille, että sen kartoittaminen scripts.js tiedostossa 
# oli nopeampaa ja helpompaa. Scripti osaa myös poistaa tuplat.

# importataan csv-moduuli, joka mahdollistaa tiedostojen lukemisen ja kirjoittamisen
import csv

# asetetaan tiedostojen polut muuttujiin, input = sisään tuleva data, output = puhdistettu data
input_file_path = 'frequencies.txt'
output_file_path = 'stations_list.txt'

# Mitkä sarakkeet halutaan säilyttää
desired_columns = ["Aseman nimi"]

# Avataan tiedostot ja luetaan ne. Tässä oli tärkeää valita input encodingiksi latin-1,
# jotta tiedosto saatiin luettua oikein. alkuperäisessä tiedostossa oli ns. "ihme merkkejä".
# ELi luultavasti ääkkösiä.
with open(input_file_path, 'r', encoding='latin-1') as input_file:
    with open(output_file_path, 'w', encoding='utf-8', newline='') as output_file:
        # Luetaan tiedostot. Tässä käytetään DictReaderia, joka mahdollistaa tiedoston lukemisen
        # sanakirjamuodossa. Tämä helpottaa tiedoston käsittelyä.
        # Tämän lisäksi tärkeää oli laittaa delimiteriksi tabulaattori, jotta tiedosto saatiin
        # luettua oikein. Alkuperäisessä tiedostossa oli sarakkeiden välissä tabulaattori.
        reader = csv.DictReader(input_file, delimiter='\t')
        writer = csv.DictWriter(output_file, fieldnames=desired_columns, delimiter='\t')

        # Kirjoitetaan headeri
        writer.writeheader()

        # Käytetään setiä pitämään kirjaa uniikeista arvoista
        unique_values = set()

        # Kirjoitetaan puhdistettu data
        for row in reader:
            value = row["Aseman nimi"]
            # Tarkista, onko arvo jo lisätty
            if value not in unique_values:
                cleaned_row = {column: "'" + value + "'" for column in desired_columns}
                writer.writerow(cleaned_row)
                unique_values.add(value)

# ilmoitetaan, että data on puhdistettu ja tallennettu
print(f"Cleaned data saved to {output_file_path}")
