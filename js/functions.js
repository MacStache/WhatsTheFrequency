// Haetaan html-tiedostossa oleva input-elementti, jonka id-attribuutti on location
const searchInput = document.getElementById('location');
let table;  // taulukon oma muuttuja
let firstRow; // firstRow muuttuja, joka sisältää ensimmäisen rivin

// Lataa taulukon heti sivun latautuessa
fetch('text/cleaned_frequencies.txt')
    .then(response => response.text())
    .then(data => {
        // Luodaan taulukko datasta, tehdään rivit ja sarakkeet oikeissa paikoissa
        const rows = data.split('\n');
        const tableData = rows.map(row => row.split('\t'));
        table = createTable(tableData);
        document.body.appendChild(table);
        //luodaan footer. Jostain syystä tälle piti etsiä tarkka paikka tästä, koska HTML-koodiin sisällytettynä 
        //se olisi tullut taulukon yläpuolelle. Asynkronisesta suorituksesta johtuen? En tiedä miksi, mutta nyt toimii, joten en koske enää.
        createFooter();
    })
    .catch(error => console.error('Error fetching the file:', error));

// Käynnistetään tapahtumankäsittelijä, joka reagoi input-elementin muutoksiin. Eli, jos input boxin sisältö muuttuu niin haku pyörähtää
searchInput.addEventListener('input', function () {
    // Suoritetaan haku!
    performSearch();
});

// Funktio joka luo ja palauttaa taulukon
function createTable(tableData) {
    const htmlTable = document.createElement('table');
    htmlTable.id = 'frequenciesTable';
    // Luodaan otsikkorivi
    const headerRow = htmlTable.insertRow();
    const columns = ["Kunta", "Aseman nimi", "Taajuus (MHz)"];
    // Luodaan otsikkosolut
    columns.forEach(column => {
        const cell = headerRow.insertCell();
        cell.textContent = column;
    });

    // Lisätään rivit taulukkoon
    tableData.slice(0).forEach(rowData => {
        const row = htmlTable.insertRow();
        rowData.forEach((cellData, index) => {
            const cell = row.insertCell();
            // Lisätään hyperlinkki "Aseman nimi" soluun
            if (columns[index] === "Aseman nimi") {
                //kutsutaan createLink funktiota, että saadaan "Aseman nimi" -sarakkeeseen linkit automatiikalla 
                const link = createLink(cellData);
                cell.appendChild(link);
            } else {
                cell.textContent = cellData;
            }
        });
    });
    // palautetaan taulukko
    return htmlTable;
}

// Funktio joka luo footerin
function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = '<p>Made by | Henri Laukka</p>';
    document.body.appendChild(footer);
}

// Funktio, joka suorittaa haun
function performSearch() {
    // haetaan hakutermi
    const searchTerm = searchInput.value.toLowerCase();
    // haetaan taulukosta kaikki rivit, paitsi otsikkorivi
    const rows = table.querySelectorAll('tr:not(:first-child)');
    // Loopataan rivit läpi
    rows.forEach(row => {
        // Tarkistetaan, että rivissä on soluja ennen kuin yritetään hakea solun sisältöä
        if (row.cells.length > 0) {
            // Haetaan riveistä ensimmäinen solu "Kunta"
            const kuntaCell = row.cells[0];
            // Muutetaan solun teksti pieniksi kirjaimiksi, että hakeminen on osuvampaa
            const kuntaText = kuntaCell.textContent.toLowerCase();
            // Tarkastetaan, että onko hakutermiä löydetty "Kunta"-sarakkeesta
            if (kuntaText.includes(searchTerm)) {
                // Jos on lyötynyt niin näytetään rivi
                row.style.display = '';
            } else {
                // Jos ei niin piilotetaan rivi
                row.style.display = 'none';
            }
        }
    });
}

// Funktio luo hyperlinkin tekstiin perustuen
function createLink(cellText) {
    const link = document.createElement('a');
    // Kartoitetaan linkitettävät tekstit ja niiden linkit. 
    // Näitä on ihan simona, mutta en keksinyt mitään helpompaakaan keinoa tätä varten  
    const urlMapping = {
        'Radio Mega': 'https://mega.fi',
        'Aito Iskelmä': 'https://www.aitoiskelma.fi/',
        'HitMix': 'https://www.hitmix.fi/',
        'Järviradio': 'https://www.jarviradio.fi/',
        'NRJ': 'https://www.nrj.fi/',
        'PATMOS': 'https://www.patmos.fi/',
        'Yle Radio 1': 'https://yle.fi/radio1/',
        'Yle Radio Suomi': 'https://yle.fi/radiosuomi/',
        'Yle Sami Radio': 'https://yle.fi/sapmi/',
        'YleX': 'https://yle.fi/ylex/',
        'Hiidenkallio':'#',
        'Iskelmä': 'https://www.iskelma.fi/',
        'Radio Nova': 'https://www.radionova.fi/',
        'Radio Suomipop': 'https://www.radiosuomipop.fi/',
        'SuomiRock': 'https://www.radiosuomirock.fi/',
        'Vermo Areena': 'https://www.vermo.fi/',
        'Yle Mondo': 'https://areena.yle.fi/podcastit/1-50033538',
        'Yle Radio Vega': 'https://areena.yle.fi/podcastit/ohjelmat/57-P3mO0mdm6',
        'Yle X3M': 'https://areena.yle.fi/podcastit/ohjelmat/57-md5vJP6a2',
        'Radio Ramona': 'https://www.radioramona.fi/',
        'Loop': 'https://www.loop.fi/',
        'Radio City': 'https://www.radiocity.fi/',
        'Radio Dei': 'https://www.radiodei.fi/',
        'Radio Rock': 'https://www.radiorock.fi/',
        'Radio Pooki': 'https://www.radiopooki.fi/',
        '89.7': '#',
        '90.0': '#',
        'Nostalgia': 'https://www.radionostalgia.fi/',
        'Radio Kaleva': 'https://www.radiokaleva.fi/',
        'Radio Sandels': 'https://www.radiosandels.fi/',
        'RollFM': 'https://www.rollfm.fi/',
        'SuomiRäp': 'https://www.suomirap.fi/',
        'Varnes-Hippos raviradio': 'https://www.hippos.fi/',
        'Radio Voima': 'https://www.radiovoima.fi/',
        'Basso': 'https://www.basso.fi/',
        'Classic': 'https://radioplay.fi/radio-classic/',
        'Classic Hits': 'https://www.supla.fi/classichits',
        'Easy Hits': 'https://www.supla.fi/easyhits',
        'Finest Plus FM': '#',
        'Forum 1': '#',
        'Forum 2': '#',
        'Forum 3': '#',
        'Forum 4': '#',
        'Forum 5': '#',
        'Forum 6': '#',
        'Groove FM': 'https://www.groovefm.fi/',
        'Kasari': 'https://radioplay.fi/kasari/',
        'Kiekkoradio': '#',
        'Krishna Radio': '#',
        'KujaFM/Metropolian opiskeijarad': 'https://taajuusmedia.fi/kujafm/',
        'Lähiradio': '#',
        'Myyrä 1': '#',
        'Myyrä 2': '#',
        'Myyrä 3': '#',
        'Myyrä 4': '#',
        'Paikoitushallitoistin': '#',
        'P-CityForum 1': '#',
        'P-CityForum 2': '#',
        'P-Eliel 1': '#',
        'P-Eliel 2': '#',
        'P-Kluuvi 1': '#',
        'P-Kluuvi 2': '#',
        'P-Kluuvi 3': '#',
        'Radio Helsinki': 'https://www.radiohelsinki.fi/',
        'Radio Trombit': 'https://trombit.net/radio-trombit/',
        'Radiotaajuus Helsinki': '#',
        'Snooker turnaus': '#',
        'Stockmann 1': '#',
        'Stockmann 2': '#',
        'Stockmann 3': '#',
        'Tekoälyradio': 'https://radioplay.fi/tekoalyradio/',
        'Top51': 'https://www.top51.fi/',
        'Vuoli-Tunneli': '#',
        'Vva': '#',
        'Radiotaajuus Huittinen': '#',
        'Iskelmä Sastamala': 'https://www.iskelma.fi/',
        'Radio 957': 'https://www.radio957.fi/',
        'Iskelmä Janne': '#',
        'JW.ORG': '#',
        'Radio City Hämeenlinna': 'https://www.radiocity.fi/',
        'Kuhan FM': 'https://www.kuhan.fm/',
        'Savon Aallot': 'https://www.savonaallot.fi/',
        'Radio SUN': 'https://www.radiosun.fi/',
        'Mix Megapol': 'https://www.mixmegapol.se/',
        'Radiotaajuus Joroinen': '#',
        'Karjalainen Syke': 'https://www.karjalainensyke.fi/',
        'Killerin Raviradio': 'https://www.killeri.fi/',
        'Radio Keskisuomalainen': 'https://www.radiokeskisuomalainen.fi/',
        'Kilpakorven raviradio': 'https://jamsanraviry.com/yhteystiedot/',
        'Radio Robin Hood': '#',
        'Kalajoen seurakunnan jumalanpal': 'https://www.kalajoenseurakunta.fi/',
        'Radio Kankaanpää': '#',
        'Kaustisten Raviradio': 'https://kaustisenravit.fi/',
        'Sea FM Radio': 'https://www.seafm.fi/',
        'Järviradio Joensuu': 'https://www.jarviradio.fi/',
        'Radio Pori': 'https://www.radiopori.fi/',
        'Radio Vaasa - Radio Vasa': 'https://www.radiovaasa.fi/',
        'Tehdasaluetoistin Kontiolahti': '#',
        'Ei vielä nimeä': '#',
        'Lyhytaikainen radio': '#',
        'Raviradio Kouvola': 'https://www.kouvolanravirata.com/',
        'EsikoisetFM': '#',
        'Iskelmä Lahti': 'https://www.iskelma.fi/',
        'Monikulttuuri': '#',
        'SM-RALLISPRINT LAUKAA': '#',
        'Karnainen': '#',
        'Lehmihaka': '#',
        'Orosmäki': '#',
        'Pitkämäki': '#',
        'Tervakorpi': '#',
        'Auran Aallot': 'https://www.auranaallot.fi/',
        'Iskelmä Porvoo': 'https://www.iskelma.fi/',
        'Radio LFF': 'https://www.lff.fi/lff-media/radio-lff/',
        'Rockklassiker': '#',
        'Steel FM': '#',
        'Tehdashallitoistin': '#',
        'Toriparkki 1.1': '#',
        'Toriparkki 1.2': '#',
        'Toriparkki 1.3': '#',
        'Toriparkki 1.4': '#',
        'Toriparkki 1.5': '#',
        'Toriparkki 1.6': '#',
        'Toriparkki 2.1': '#',
        'Toriparkki 2.2': '#',
        'Toriparkki 2.3': '#',
        'Toriparkki 2.4': '#',
        'Toriparkki 2.5': '#',
        'Toriparkki 2.6': '#',
        'Tunturien kirkko': '#',
        'PATMOS ': 'https://www.patmos.fi/',
        'Radio Suomi': 'https://www.radiosuomi.fi/',
        'Radio City Pori': 'https://www.radiocity.fi/',
        'Harjoitusradio': '#',
        'Teräsradio 1 Iskelmä': 'https://www.iskelma.fi/',
        'Teräsradio 2 Basso': 'https://www.basso.fi/',
        'Teräsradio 3 Radio Nova': 'https://www.radionova.fi/',
        'Teräsradio 4 Radio Rock': 'https://www.radiorock.fi/',
        'Teräsradio 5 Ylex': 'https://yle.fi/ylex/',
        'Teräsradio 6 Radio Suomi': 'https://www.radiosuomi.fi/',
        'Opistoradio': '#',
        'SCM Radio': '#',
        'Iskelmä Rovaniemi': 'https://www.iskelma.fi/',
        'Serres 1': '#',
        'Auran Aallot Salo': 'https://www.auranaallot.fi/',
        'Hepomäki': '#',
        'Lakiamäki': '#',
        'Halli 1': '#',
        'Halli 2': '#',
        'P4 Stockholm': '#',
        'Radio Vega': 'https://areena.yle.fi/podcastit/ohjelmat/57-P3mO0mdm6',
        'Sr P1': '#',
        'Sr P2': '#',
        'Sr P3': '#',
        'Ålands Radio': 'https://alandsradio.ax/',
        'Iskelmä (SFN)': 'https://www.iskelma.fi/',
        'Kantriradio': 'https://www.kantriradio.fi/',
        'Radio Moreeni': 'https://www.radiomoreeni.fi/',
        'Radio Musa': 'https://www.radiomusa.fi/',
        'NRJ ': 'https://www.nrj.fi/',
        'Mirka': '#',
        'Urheilutapahtumaradio': '#',
        'Tampereen Kiakkoradio': 'https://kiakkoradio.fi/',
        'Radio City Forssa': 'https://www.radiocity.fi/',
        'SM-HIIHDOT ÄÄNEKOSKI': '#',
    };
    link.href = urlMapping[cellText] || '#'; // Defaulttina linkitetään indeksiin '#' jos ei ole kartoitettu
    link.textContent = cellText; // lisätään linkkiin teksti
    return link;
}
