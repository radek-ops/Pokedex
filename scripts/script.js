/**
 * Color mapping for Pokémon types.
 * Used as background colors for thumbnails and dialogs.
 */
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
let result = [];
let newResult = [];
let wantedNamesArray = [];
const pokemonsCache = {};
let currentCategory = {};
let pkThumbnail = document.getElementById("thumbnail");
let thumbnailBackgroundcolor = document.getElementById("thumbnailBackgroundcolor");
let dialogBackgroundcolor = document.getElementById("dialogBackgroundcolor");
const pkDialog = document.getElementById("dialog");

/**
 * Returns a promise that resolves after the given milliseconds.
 * Used to visually show the loading spinner.
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/** Initializes the app by loading the first batch of Pokémon data. */
function init() {
    loadPkData();
}

/**
 * Fetches a batch of Pokémon from the PokéAPI paginated list.
 * Shows the loading spinner while fetching.
 * @returns {Promise<void>}
 */
async function loadPkData() {
    loadingSpinner();
    await sleep(1000);
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`;
    let response = await fetch(BASE_URL, { method: "GET" });
    let data = await response.json();
    currentPkData = data.results;
    await loadPkDataDetails();
    hideSpinner();
}

/**
 * Fetches detailed data for each Pokémon in the current batch.
 * Caches results by ID and name, then renders thumbnails.
 * @returns {Promise<void>}
 */
async function loadPkDataDetails() {
    let savePkData = currentPkData.map(pkData => fetch(pkData.url).then(response => response.json()));
    result = await Promise.all(savePkData);
    newResult = [...newResult, ...result];
    for (let i = 0; i < result.length; i++) {
        let pokemon = result[i];
        pokemonsCache[pokemon.id] = pokemon;
        pokemonsCache[pokemon.name] = pokemon;
        showThumbnailPkNamesAndTypes(pokemon);
    }
    pkNamesArray();
}

/** Loads the next batch of Pokémon (increases offset). */
function loadMorePk() {
    currentOffset += limit;
    loadPkData();
}

/**
 * Extracts type names from a Pokémon and triggers thumbnail rendering.
 * @param {Object} pokemon - Pokémon data object
 */
function showThumbnailPkNamesAndTypes(pokemon) {
    let pkTypeName1 = pokemon.types[0].type.name;
    let pkTypeName2 = "";
    if (pokemon.types.length > 1) {
        pkTypeName2 = pokemon.types[1].type.name;
    }
    showThumbnailBackgroundcolor(pokemon, pkTypeName1, pkTypeName2);
}

/**
 * Renders a Pokémon thumbnail into the grid with the correct background color.
 * @param {Object} pokemon - Pokémon data object
 * @param {string} pkTypeName1 - First type name
 * @param {string} pkTypeName2 - Second type name (empty if none)
 */
function showThumbnailBackgroundcolor(pokemon, pkTypeName1, pkTypeName2) {
    let typeName = pokemon.types[0].type.name;
    let bg_Color = typeColors[typeName];
    pkThumbnail.innerHTML += renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color);
    pkTypeName2StyleThumbnail(pokemon);
}

/**
 * Hides the second type badge if the Pokémon has only one type.
 * @param {Object} pokemon - Pokémon data object
 */
function pkTypeName2StyleThumbnail(pokemon) {
    let pkTypeName2Style = document.getElementById("typeSlot2" + pokemon.id);
    if (pokemon.types.length === 1) {
        pkTypeName2Style.classList.add("unset-pkTypeName2Style-bg");
    }
}

/**
 * Opens the detail dialog for a specific Pokémon by ID.
 * @param {number|string} pokemonId - Pokémon ID
 */
function showPkDialog(pokemonId) {
    let thisPokemon = pokemonsCache[pokemonId];
    let typeName = thisPokemon.types[0].type.name;
    let bg_Color = typeColors[typeName];
    let pkTypeName1 = thisPokemon.types[0].type.name;
    let pkTypeName2 = "";
    if (thisPokemon.types.length > 1) {
        pkTypeName2 = thisPokemon.types[1].type.name;
    }
    showAbilitiesInDialog(pokemonId, pkTypeName1, pkTypeName2, bg_Color);
}

/**
 * Builds the abilities string and proceeds to load species data.
 * @param {number|string} pokemonId - Pokémon ID
 * @param {string} pkTypeName1 - First type name
 * @param {string} pkTypeName2 - Second type name
 * @param {string} bg_Color - Background color for the type
 */
function showAbilitiesInDialog(pokemonId, pkTypeName1, pkTypeName2, bg_Color) {
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
    showCatergoryInDialog(aboutPokemon, pkTypeName1, pkTypeName2, bg_Color, abilities);
}

/**
 * Fetches the species data to get the Pokémon's category and renders the full dialog.
 * @param {Object} aboutPokemon - Pokémon data object
 * @param {string} pkTypeName1 - First type name
 * @param {string} pkTypeName2 - Second type name
 * @param {string} bg_Color - Background color for the type
 * @param {Object} abilities - Abilities object {ability1, ability2, ability3}
 * @returns {Promise<void>}
 */
async function showCatergoryInDialog(aboutPokemon, pkTypeName1, pkTypeName2, bg_Color, abilities) {
    loadingSpinner();
    let response = await fetch(aboutPokemon.species.url);
    currentCategory = await response.json();
    let pkcategory = currentCategory.genera[7].genus;
    renderFullDialog(aboutPokemon, pkTypeName1, pkTypeName2, bg_Color, abilities, pkcategory);
    hideSpinner();
}

/**
 * Shows the "About" tab content inside the dialog.
 * @param {number|string} thisPokemonId - Pokémon ID
 * @param {string} pkcategory - The Pokémon's category (genus)
 */
function showAboutInDialog(thisPokemonId, pkcategory) {
    let thisPokemon = pokemonsCache[thisPokemonId];
    let aboutPokemon = pokemonsCache[thisPokemonId];
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
    let contentAbout = document.getElementById("dialogContent");
    contentAbout.innerHTML = "";
    contentAbout.innerHTML = dialogAboutSectionTpl(thisPokemon, abilities, pkcategory);
}

/**
 * Shows the "Stats" tab content inside the dialog.
 * @param {number|string} thisPokemonId - Pokémon ID
 */
function showStatesInDialog(thisPokemonId) {
    let thisPokemon = pokemonsCache[thisPokemonId];
    let contentStats = document.getElementById("dialogContent");
    if (contentStats) {
        contentStats.innerHTML = dialogStatesSectionTpl(thisPokemon);
    }
}

/**
 * Recursively extracts all evolution names from an evolution chain.
 * @param {Object} chain - Evolution chain node
 * @param {Array<string>} evoNames - Array to push evolution names into
 */
function extractEvoNames(chain, evoNames) {
    evoNames.push(chain.species.name);
    chain.evolves_to.forEach(nextChain => {
        extractEvoNames(nextChain, evoNames);
    });
}

/**
 * Fetches the evolution chain and shows the "Evolution" tab content.
 * @param {number|string} pokemonId - Pokémon ID
 * @returns {Promise<void>}
 */
async function showEvolutionInDialog(pokemonId) {
    loadingSpinner();
    let thisPokemon = pokemonsCache[pokemonId];
    let response = await fetch(currentCategory.evolution_chain.url);
    let evoData = await response.json();
    let evoNames = [];
    extractEvoNames(evoData.chain, evoNames);
    let contentEvolution = document.getElementById("dialogContent");
    if (contentEvolution) {
        contentEvolution.innerHTML = dialogEvolutionSectionTpl(thisPokemon, evoNames);
    }
    hideSpinner();
}

/**
 * Shows the "Moves" tab content inside the dialog.
 * @param {number|string} thisPokemonId - Pokémon ID
 */
function showMovesInDialog(thisPokemonId) {
    let thisPokemon = pokemonsCache[thisPokemonId];
    let contentMoves = document.getElementById("dialogContent");
    contentMoves.innerHTML = dialogMovesSectionTpl(thisPokemon);
    renderPokemonMoves(thisPokemon);
}

/**
 * Builds the complete dialog including header, upper section, content area, and footer.
 * @param {Object} pokemon - Pokémon data object
 * @param {string} pkTypeName1 - First type name
 * @param {string} pkTypeName2 - Second type name
 * @param {string} bg_Color - Background color for the type
 * @param {Object} abilities - Abilities object {ability1, ability2, ability3}
 * @param {string} pkcategory - The Pokémon's category (genus)
 */
function renderFullDialog(pokemon, pkTypeName1, pkTypeName2, bg_Color, abilities, pkcategory) {
    pkDialog.innerHTML = dialogHeaderTpl() +
        dialogUpperSectionTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color, pkcategory) +
        `<div id="dialogContent" class"dialog-content">` +
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

/**
 * Renders up to 6 moves into the moves table inside the dialog.
 * @param {Object} thisPokemon - Pokémon data object
 */
function renderPokemonMoves(thisPokemon) {
    let mv = document.getElementById("table-moves");
    let movesNames = [];
    for (let i = 0; i < 6; i++) {
        if (thisPokemon.moves[i]) {
            let pkMoves = thisPokemon.moves[i].move.name;
            movesNames.push(pkMoves);
            mv.innerHTML += renderSingelMoveTpl(i, movesNames);
        } else {
            break;
        }
    }
}

/**
 * Searches for a Pokémon by the exact name entered in the search field.
 * Opens the detail dialog if found, otherwise shows an error message.
 */
function searchPokemon() {
    let inputPkName = document.getElementById("userInput");
    let wantedName = inputPkName.value.toLowerCase();
    let foundPokemon = pokemonsCache[wantedName];
    if (foundPokemon) {
        showPkDialog(foundPokemon.id);
    } else {
        showErrorSpeechBubble();
        document.getElementById("userInput").value = "";
    }
     document.getElementById("userInput").value = "";
}

/** Triggers an autocomplete search when at least 3 characters are typed. */
function searchPkByThreeChar() {
    let searchPkName = document.getElementById("userInput");
    let pkChar = searchPkName.value.toLowerCase();
    if (pkChar.length >= 3) {
        filterPkNames(pkChar);
    }
}

/** Builds the array of all known Pokémon names (for autocomplete). */
function pkNamesArray() {
    let saveAllPkValues = Object.values(newResult);
    wantedNamesArray = saveAllPkValues.map(pkname => pkname.name);
}

/**
 * Filters the name list by the given search string.
 * @param {string} pkChar - The search string (at least 3 characters)
 */
function filterPkNames(pkChar) {
    let foundPokemons = [];
    foundPokemons = wantedNamesArray.filter(wantedPk => wantedPk.includes(pkChar));
    filterPokemons(foundPokemons);
}

/**
 * Populates the datalist with the filtered Pokémon names.
 * @param {Array<string>} foundPokemons - Array of matching Pokémon names
 */
function filterPokemons(foundPokemons) {
    let pkOption = document.getElementById("wantedPkNames");
    pkOption.innerHTML = "";
    foundPokemons.forEach(pkName => {
        pkOption.innerHTML += addfoundPkTpl(pkName);
    });
}

/**
 * Displays an error speech bubble when a searched Pokémon is not found.
 * Automatically hides after 4 seconds.
 */
function showErrorSpeechBubble() {
    const error = document.getElementById("error");
    error.innerText = "Not found,please enter a valid name or load more Pokémons";
    error.classList.add("show");
    setTimeout(() => {
        error.classList.remove("show");
    }, 4000);
}

/**
 * Navigates to the next Pokémon in the dialog (by ID + 1).
 * Wraps around to ID 1 if the end of the cache is reached.
 * @param {number|string} thisPokemonId - Current Pokémon ID
 */
function clickButtonNext(thisPokemonId) {
    let nextPkId = Number(thisPokemonId) + 1;
    let maxId = 0;
    for (let id = 1; id < 1350; id++) {
        if (pokemonsCache[id]) {
            maxId = id;
        }
    }
    if (nextPkId > maxId) {
        nextPkId = 1;
    }
    showPkDialog(nextPkId);
}

/**
 * Navigates to the previous Pokémon in the dialog (by ID - 1).
 * Wraps around to the highest cached ID if below 1.
 * @param {number|string} thisPokemonId - Current Pokémon ID
 */
function clickButtonPrevious(thisPokemonId) {
    let previousPkId = Number(thisPokemonId) - 1;
    let minId = 0;
    for (let id = 1; id < 1350; id++) {
        if (pokemonsCache[id]) {
            minId = id;
        }
    }
    if (previousPkId < 1) {
        previousPkId = minId;
    }
    showPkDialog(previousPkId);
}

/** Closes the Pokémon detail dialog and removes the modal-open class. */
function closeDialog() {
    pkDialog.close();
    document.body.classList.remove("modal-open");
}

/**
 * Prevents click events from propagating to the dialog backdrop.
 * @param {Event} event - The click event
 */
function closeDialogOutsite(event) {
    event.stopPropagation();
}

/** Shows the loading spinner and hides the "Load more" button. */
function loadingSpinner() {
    document.getElementById("spinnerCont").style.display = "flex";
    document.getElementById("loadingSpinner").style.display = "flex";
    document.getElementById("spinnerText").style.display = "block";
    document.getElementById("loadMoreButton").style.display = "none";
    document.getElementById("spinnerSection").style.display = "block";
}

/** Hides the loading spinner and shows the "Load more" button. */
function hideSpinner() {
    document.getElementById("spinnerCont").style.display = "none";
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("spinnerText").style.display = "none";
    document.getElementById("loadMoreButton").style.display = "block";
    document.getElementById("spinnerSection").style.display = "none";
}