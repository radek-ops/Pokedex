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
let pokemon;
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
    loadPkDataDetails();

}

async function loadPkDataDetails() {
    let savePkData = currentPkData.map(pkData => fetch(pkData.url).then(response => response.json()));
    let result = await Promise.all(savePkData);

    currentPokemonsDetails.push(...result);
    console.log(currentPokemonsDetails);

    for (let i = 0; i < result.length; i++) {
        const pokemon = result[i];


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

    for (let i = 0; i < currentPokemonsDetails.length; i++) {
        pokemon = currentPokemonsDetails[i];
        if (pokemon.name === wantedName) {
            pkFound = true;
            let foundPkId = pokemon.id;
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

function showPkDialog(pokemonId, pkTypeName1, pkTypeName2, bg_Color) {
    for (let i = 0; i < currentPokemonsDetails.length; i++) {
        pokemon = currentPokemonsDetails[i];
        if (pokemon.id == pokemonId) {
            pkDialog.showModal();
            pkDialog.innerHTML = dialogHtmlTpl(pokemonId, pkTypeName1, pkTypeName2, bg_Color);
            pkTypeName2StyleDialog(pokemonId)
            break;
        }
    }

}

function pkTypeName2StyleDialog(pokemonId) {
    let pkTypeName2Style = document.getElementById("dialogTypeSlot2" + pokemonId);
    if (pokemon.types.length === 1) {
        pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
    }
}

function closeButtonDialog() {
    pkDialog.close();
}

function clickButtonNext(pokemonId, pkTypeName1, pkTypeName2, bg_Color) {
    let nextPkId = Number(pokemonId) + 1;

    for (let i = 0; i < currentPokemonsDetails.length; i++) {
        pokemon = currentPokemonsDetails[i];
        if (pokemon.id == nextPkId) {
            let typeName = pokemon.types[0].type.name;
            bg_Color = typeColors[typeName];
            pkTypeName1 = pokemon.types[0].type.name;
            pkTypeName2 = "";
            if (pokemon.types.length > 1) {
                pkTypeName2 = pokemon.types[1].type.name;
            }
            showPkDialog(nextPkId, pkTypeName1, pkTypeName2, bg_Color);
            pkTypeName2StyleDialog(nextPkId);
            break;
        }
    }
}

function clickButtonPrevious(pokemonId, pkTypeName1, pkTypeName2, bg_Color) {
    let nextPkId = Number(pokemonId) - 1;

    for (let i = 0; i < currentPokemonsDetails.length; i++) {
        pokemon = currentPokemonsDetails[i];
        if (pokemon.id == nextPkId) {
            let typeName = pokemon.types[0].type.name;
            bg_Color = typeColors[typeName];
            pkTypeName1 = pokemon.types[0].type.name;
            pkTypeName2 = "";
            if (pokemon.types.length > 1) {
                pkTypeName2 = pokemon.types[1].type.name;
            }
            showPkDialog(nextPkId, pkTypeName1, pkTypeName2, bg_Color);
            pkTypeName2StyleDialog(nextPkId);
            break;
        }
    }
}

function closeDialogOutsite(event) {
    event.stopPropagation();
}

