// const urlEurope = 'https://restcountries.com/v3.1/region/Europe';
// const urlAsie = 'https://restcountries.com/v3.1/region/asia';
// const urlAmerica = 'https://restcountries.com/v3.1/region/America';
// const urlAfrica = 'https://restcountries.com/v3.1/region/Africa';

const urlRegion = 'https://restcountries.com/v3.1/region/';
const urlAllCountries = 'https://restcountries.com/v3.1/all';


/**
 * Prépare le code HTML pour la présentation d'un pays
 * @param {json} country les données sur le pays au format json
 * @returns {string} le code HTML
 */
function createCountry(country) {
    let newCountry = '<li class="country">';
    newCountry += '<img class="c-flag" src="'+ country.flags.svg + '"/>';
    // newCountry += '<h2 class="c-name">' + country.name.common + '</h2>';
    newCountry += '<h2 class="c-name">' + country.name.nativeName.fra.official + '</h2>';
    newCountry += '<p class="c-capital">' + country.capital + '</p>';
    newCountry += '</li>';
    return newCountry;
}

/**
 * Affiche la liste des pays francophones par continent 
 * (Europe, Asie, Amérique, Afrique)
 * @param {string} continent ("Europe", "Asie", "Americas", "Africa")
 * 
 */
function getCountries(continent) {
    let countries;

    // Définir l'url en fonction de 
    // l'intitulé continent reçu en paramètre
    // **************************************
    let url = urlRegion + continent;

    // Création de la requête
    // **********************
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = 'json';
    req.send();

    req.onload = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if(req.status == 200) {
                countries = req.response;

                // Traitement de la réponse
                // Afficher uniquement les pays francophones
                // *****************************************
                let countriesTab = Object.keys(countries).map(key => countries[key]);
                listResult.innerHTML = '';    
                countriesTab.forEach(c => {
                    if(c.languages.fra == 'French') {
                        console.log(c.name.common);
                        let newCountry = createCountry(c);
                        listResult.innerHTML += newCountry;
                    }
                });
            }
        }
    }
}

// Init des Gestionnaires d'events pour chaque bouton de la NaV
// ************************************************************
let btnEurope = document.getElementById("eu");
let btnAsie = document.getElementById("as");
let btnAfrique = document.getElementById("af");
let btnAmerique = document.getElementById("am");

btnEurope.addEventListener('click', () => getCountries("Europe"));
btnAfrique.addEventListener('click', () => getCountries("Africa"));
btnAsie.addEventListener('click', () => getCountries("Asia"));
btnAmerique.addEventListener('click', () => getCountries("Americas"));

let listResult = document.querySelector('.countries');


