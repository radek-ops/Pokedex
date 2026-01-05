
let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let currentPkCards = [];
let pkCard = document.getElementById("pkCards");

function init() {
    loadPokemonCards();
}

// Holt Daten asynchron vom Server
async function loadPokemonCards() {
    let response = await fetch(BASE_URL);           // Anfrage senden
    let loadedPkCards = await response.json();     // Antwort in JSON umwandeln
    
    currentPkCards = loadedPkCards.results;      // Liste der Pokémon speichern
       
    for (let index = 0; index < currentPkCards.length; index++) {
        pkCard.innerHTML += renderPokemonCards(index); 
    }
}


function renderPokemonCards(index) {
        return `<div class="thumbnails">${currentPkCards[index].name}</div>`;
}