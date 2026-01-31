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
const pokemonsCache = {};
let currentCategory = {};
let currentUrl = 0;
let pkThumbnail = document.getElementById("thumbnail");
let thumbnailBackgroundcolor = document.getElementById("thumbnailBackgroundcolor");
let dialoglBackgroundcolor = document.getElementById("dialoglBackgroundcolor")
const pkDialog = document.getElementById("dialog");

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
    console.log(result);

    for (let i = 0; i < result.length; i++) {
        let pokemon = result[i];
        pokemonsCache[pokemon.id] = pokemon;
        pokemonsCache[pokemon.name] = pokemon;

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
    console.log(pokemon.id);
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
    let foundPokemon = pokemonsCache[wantedName];

    if (foundPokemon) {
        showPkDialog(foundPokemon.id);
    } else {
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
    let typeName = thisPokemon.types[0].type.name;
    let bg_Color = typeColors[typeName];
    let pkTypeName1 = thisPokemon.types[0].type.name;
    let pkTypeName2 = "";

    if (thisPokemon.types.length > 1) {
        pkTypeName2 = thisPokemon.types[1].type.name;
    }

    showAboutInDialog(pokemonId, pkTypeName1, pkTypeName2, bg_Color);
}

async function showAboutInDialog(pokemonId, pkTypeName1, pkTypeName2, bg_Color) {
    let aboutPokemon = pokemonsCache[pokemonId];

    let abilities = { ability1: "", ability2: "", ability3: "" };
    let list = aboutPokemon.abilities;

    abilities.ability1 = list[0].ability.name;

    if (list.length > 1) {
        abilities.ability1 += ", ";
        abilities.ability2 = list[1].ability.name;
    }
    if (list.length > 2) {
        abilities.ability2 += ", ";
        abilities.ability3 = list[2].ability.name;
    }
    currentCategory = await fetch(aboutPokemon.species.url).then(response => response.json());
    console.log(currentCategory);
    let pkcategory = currentCategory.genera[7].genus

    let contentAbout = document.getElementById("dialogContent");
    if (contentAbout) {
        contentAbout.innerHTML = dialogAboutSectionTpl(aboutPokemon, abilities, pkcategory);
    }
    renderFullDialog(aboutPokemon, pkTypeName1, pkTypeName2, bg_Color, abilities, pkcategory);
}


function renderFullDialog(pokemon, pkTypeName1, pkTypeName2, bg_Color, abilities, pkcategory) {
    pkDialog.innerHTML = dialogHeaderTpl() +
        dialogUpperSectionTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) +
        `<div id="dialogContent">` +
        dialogAboutSectionTpl(pokemon, abilities, pkcategory) +
        `</div>` +
        dialogFooterTpl(pokemon);

    if (pokemon.types.length === 1) {
        let pkTypeName2Style = document.getElementById("dialogTypeSlot2");
        if (pkTypeName2Style) {
            pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
        }
    }

    pkDialog.showModal();
    document.body.classList.add("modal-open");
}

async function showStatesInDialog(thisPokemonId) {
    let thisPokemon = pokemonsCache[thisPokemonId];
    console.log(thisPokemon);
    let contentStats = document.getElementById("dialogContent");
    if (contentStats) {
        contentStats.innerHTML = dialogStatesSectionTpl(thisPokemon);
    }
}

async function showEvolutionInDialog(pokemonId) {
    let thisPokemon = pokemonsCache[pokemonId];
    let response = await fetch(currentCategory.evolution_chain.url);
    let evoPokemon = await response.json();
    console.log(evoPokemon);
    let chain = evoPokemon.chain;
    let evoNames = [];

    extractEvoNames(chain, evoNames);
    function extractEvoNames(chain, evoNames) {
        evoNames.push(chain.species.name);
        chain.evolves_to.forEach(nextChain => {
            extractEvoNames(nextChain, evoNames);

        });
    }

    let contentEvolution = document.getElementById("dialogContent");
    if (contentEvolution) {
        contentEvolution.innerHTML = evoNames.join("<br>");
        contentEvolution.innerHTML = dialogEvolutionSectionTpl(thisPokemon, evoNames);
    }
}

function showMovesInDialog(thisPokemonId) {
    let thisPokemon = pokemonsCache[thisPokemonId];
    console.log(thisPokemon);

    let contentMoves = document.getElementById("dialogContent");
    if (contentMoves) {
        contentMoves.innerHTML = dialogMovesSectionTpl(thisPokemon);

    }

     let mv = document.getElementById("table-moves");

    for (let i = 0; i < 10; i++) {
        let pkMoves = thisPokemon.moves.move[i];
        console.log(pkMoves);



       

    }


}

function clickButtonNext(thisPokemonId) {
    let nextPkId = Number(thisPokemonId) + 1;
    showPkDialog(nextPkId);
}

function clickButtonPrevious(thisPokemonId) {
    let previousPkId = Number(thisPokemonId) - 1;
    if (previousPkId === 0) {
        return;
    }
    showPkDialog(previousPkId);
}

function closeButtonDialog() {
    pkDialog.close();
    document.body.classList.remove("modal-open");
}

function closeDialog() {
    pkDialog.close();
    document.body.classList.remove("modal-open");
}

function closeDialogOutsite(event) {
    event.stopPropagation();
}

