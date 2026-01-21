const typeColors = {
    fire: '#fd723a',
    grass: 'rgb(107, 201, 70)',
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
let pokemonsCache = {};
let currentUrl = 0;
let pkThumbnail = document.getElementById("thumbnail");
let thumbnailBackgroundcolor = document.getElementById("thumbnailBackgroundcolor");
let dialoglBackgroundcolor = document.getElementById("dialoglBackgroundcolor")
let pkDialog = document.getElementById("dialog");


function init() {
    loadPkData();
}

async function loadPkData() {
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`;

    let response = await fetch(BASE_URL, { method: "GET" });
    let data = await response.json();
    currentPkData = data.results;
    console.log(currentPkData);
    loadPkDataDetails();
}

async function loadPkDataDetails() {
    let savePkData = currentPkData.map(pkData => fetch(pkData.url).then(response => response.json()));
    let result = await Promise.all(savePkData);

    for (let i = 0; i < result.length; i++) {
        let pokemon = result[i];
        pokemonsCache[pokemon.id] = pokemon;
        console.log(pokemon.id);
        showThumbnailPkNamesAndTypes(pokemon);
    }
}

function loadMorePk() {
    currentOffset += limit;
    console.log(currentOffset);
    loadPkData();
}

function showThumbnailPkNamesAndTypes(pokemon) {
    console.log(pokemon);
    let pkTypeName1 = pokemon.types[0].type.name;
    console.log(pkTypeName1);
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
    pkTypeName2StyleThumbnail(pokemon);
}

function pkTypeName2StyleThumbnail(pokemon) {
    let pkTypeName2Style = document.getElementById("typeSlot2" + pokemon.id);
    if (pokemon.types.length === 1) {
        pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
    }
}

function searchPokemon() {
    let inputPkName = document.getElementById("userInput");
    let wantedName = inputPkName.value.toLowerCase();
    let pkFound = false;

    for (let i = 0; i < pokemonsCache.length; i++) {

        if (pokemonsCache.name === wantedName) {
            pkFound = true;
            let foundPkId = pokemonsCache.id;
            let typeName = pokemon.types[0].type.name;
            bg_Color = typeColors[typeName];
            let pkTypeName1 = pokemon.types[0].type.name;
            let pkTypeName2 = "";
            if (pokemon.types.length > 1) {
                pkTypeName2 = pokemon.types[1].type.name;
            }
            showPkDialog(foundPkId, pkTypeName1, pkTypeName2, bg_Color);
        }
    }
    if (!pkFound) {
        showErrorSpeechBubble();
    }
}

function showErrorSpeechBubble() {
    const error = document.getElementById("error");
    error.innerText = "Not found,please enter a valid name or load more Pokémons";
    error.classList.add("show");

    setTimeout(() => {
        error.classList.remove("show");
    }, 4000);
}

function showPkDialog(pokemonId) {
    let thisPokemon = pokemonsCache[pokemonId];
    if (thisPokemon) {
        let typeName = thisPokemon.types[0].type.name;
        let bg_Color = typeColors[typeName];

        let pkTypeName1 = thisPokemon.types[0].type.name;
        let pkTypeName2 = "";
        if (thisPokemon.types.length > 1) {
            pkTypeName2 = thisPokemon.types[1].type.name;
        }
        pkTypeName2StyleDialog(thisPokemon, pkTypeName1, pkTypeName2, bg_Color);
    }
}

function pkTypeName2StyleDialog(thisPokemon, pkTypeName1, pkTypeName2, bg_Color) {

    pkDialog.innerHTML = dialogHtmlTpl(thisPokemon, pkTypeName1, pkTypeName2, bg_Color);

    if (thisPokemon.types.length === 1) {
        let pkTypeName2Style = document.getElementById("dialogTypeSlot2");
        if (pkTypeName2Style) {
            pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
        }
    }
    pkDialog.showModal();
}

function clickButtonNext(thisPokemonId) {
    let nextPkId = Number(thisPokemonId) + 1;
    let nextPokemon = pokemonsCache[nextPkId];
    if (nextPokemon) {
        let typeName = nextPokemon.types[0].type.name;
        let bg_Color = typeColors[typeName];
        let pkTypeName1 = nextPokemon.types[0].type.name;
        let pkTypeName2 = "";
        if (nextPokemon.types.length > 1) {
            pkTypeName2 = nextPokemon.types[1].type.name;
        }
        pkTypeName2StyleDialog(nextPokemon, pkTypeName1, pkTypeName2, bg_Color);
          
           
        
    }
}

function clickButtonPrevious(thisPokemonId) {
    let nextPkId = Number(thisPokemonId) - 1;
    let previousPokemon = pokemonsCache[nextPkId];
    if (previousPokemon) {
        let typeName = previousPokemon.types[0].type.name;
        let bg_Color = typeColors[typeName];
        let pkTypeName1 = previousPokemon.types[0].type.name;
        let pkTypeName2 = "";
        if (previousPokemon.types.length > 1) {
            pkTypeName2 = previousPokemon.types[1].type.name;
        }
        pkTypeName2StyleDialog(previousPokemon, pkTypeName1, pkTypeName2, bg_Color);

    }
}

function closeButtonDialog() {
    pkDialog.close();
}

function closeDialog() {
    pkDialog.close();
}

function closeDialogOutsite(event) {
    event.stopPropagation();
}

