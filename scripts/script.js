const typeColors = {
    fire: '#FF4422',
    grass: '#479727ff',
    electric: '#e7bb36ff',
    water: '#0d84fcff',
    ground: '#E0C068',
    rock: '#B8A038',
    fairy: '#EE99AC',
    poison: '#A040A0',
    bug: '#a6b617ff',
    dragon: '#7038F8',
    psychic: '#F85888',
    flying: '#A890F0',
    fighting: '#C03028',
    normal: '#A8A878',
};

let BASE_URL = "";
let currentOffset = 0;
let limit = 20;
let currentPkData = [];
let currentPokemonsDetails = [];
let pkDetails = [];
let currentUrl = 0;
let pkThumbnail = document.getElementById("thumbnail");
let thmbnailColor = document.getElementById("thumbnailColor");
let pkDialog = document.getElementById("dialog");


function init() {
    loadPkData();
}

async function loadPkData() {
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`;

    let response = await fetch(BASE_URL, { method: "GET" });
    let data = await response.json();
    console.log(data);
    currentPkData = data.results;
    loadPkDataDetails();

}

async function loadPkDataDetails() {

    let savePkData = currentPkData.map(pkData => fetch(pkData.url).then(response => response.json()));
    let result = await Promise.all(savePkData);

    currentPokemonsDetails = result;
    console.log(currentPokemonsDetails);

    for (let i = 0; i < currentPokemonsDetails.length; i++) {
       let  pokemon = currentPokemonsDetails[i];
        console.log(pokemon);

        showThumbnailPkNamesAndTypes(pokemon);
    }
}

function loadMorePk() {
    currentOffset += limit;
    console.log(currentOffset);
    loadPkData();
}

function showThumbnailPkNamesAndTypes(pokemon) {
    let pkTypeName1 = pokemon.types[0].type.name;
    let pkTypeName2 = "";
    if (pokemon.types.length > 1) {
        pkTypeName2 = pokemon.types[1].type.name;
    }
    showThumbnailBackgroundcolor(pokemon, pkTypeName1, pkTypeName2);
}

function showThumbnailBackgroundcolor(pokemon, pkTypeName1, pkTypeName2) {
    let typeName = pokemon.types[0].type.name;
    let bg_Color = typeColors[typeName];
    console.log(bg_Color);
    pkThumbnail.innerHTML += renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color);
    pkTypeName2Style(pokemon);
}

function pkTypeName2Style(pokemon) {
    let pkTypeName2Style = document.getElementById("typeSlot2" + pokemon.id);
    if (pokemon.types.length === 1) {
        pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
    }
}

function searchPokemon() {
    let inputPkName = document.getElementById("pokemonSearch");
    let wantedName = inputPkName.value.toLowerCase();
    let pkFound = false;

    for (let i = 0; i < currentPokemonsDetails.length; i++) {
         let  pokemon = currentPokemonsDetails[i];
        if (pokemon.name === wantedName) {
            pkFound = true;
            showPkDialog();
        }
    }
    if (!pkFound) {
        showErrorSpeechBubble();
    }

}

function showErrorSpeechBubble() {
    const error = document.getElementById("error");
    error.innerText = "Pokemon not found, please enter a valid name!";
    error.classList.add("show");

    setTimeout(() => {
        error.classList.remove("show");
    }, 3000);
}

function showPkDialog( pkTypeName1, pkTypeName2 ) {

 for (let i = 0; i < currentPokemonsDetails.length; i++) {
         let  pokemon = currentPokemonsDetails[i];
         let  pokemonId = pokemon;


             pkDialog.innerHTML =  dialogHtmlTpl(pokemonId, pokemon, pkTypeName1, pkTypeName2 );
               pkDialog.showModal();
     }



    }




function closeButtonDialog() {
    pkDialog.close();
}

function closeDialogOutsite(event) {
    event.stopPropagation();
}

