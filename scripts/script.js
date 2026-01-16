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
let pokemon = [];
let currentUrl = 0;
let pkThumbnail = document.getElementById("thumbnail");
let thmbnailColor = document.getElementById("thumbnailColor");
let pkDialog = document.getElementById("dialog");
pkDialog.innerHTML = dialogHtmlTpl();


function init() {
    loadPkData();
}

async function loadPkData() {
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`;

    let response = await fetch(BASE_URL, { method: "GET" });
    let data = await response.json();
    console.log(data);
    //currentPkData.length = 0;
    currentPkData = data.results;
    loadPkDataDetails();

}

async function loadPkDataDetails() {

    let savePkData = currentPkData.map(pkData => fetch(pkData.url).then(response => response.json()));
    let result = await Promise.all(savePkData);

    currentPokemonsDetails = result;
    console.log(currentPokemonsDetails);

    for (let i = 0; i < currentPokemonsDetails.length; i++) {

        pokemon = currentPokemonsDetails[i];
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

         
    for (let i = 0; i < currentPokemonsDetails.length; i++) {
         
        
        if (pokemon.name === inputPkName.value.toLowerCase()) {
                                  
            showPkDialog(pokemon.name);
            return;
        }
        else {
            showErrorSpeechBubble();
        }
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

function showPkDialog(pokemon) {

    console.log(pokemon);
    
    pkDialog.showModal();
    dialogHtmlTpl(pokemon)
}

function closeButtonDialog() {
    pkDialog.close();

}

function closeDialogOutsite(event) {
    event.stopPropagation();
}

function dialogHtmlTpl() {
    return /* html */`<div class="dialog-body" onclick="closeDialogOutsite(event)">
              <header id="headline" class="dialog-header" onclick="closeDialogOutsite(event)">
                  <nav class="nav-dialog">
                    <h2 class="headline-title-dialog">
                    <span class="part-1-dialog">Card</span>
                    <span class="divider-dialog"></span>
                    <span class="part-2-dialog">Pokedex</span>
                    </h2>
                      <button class="close-button-dialog" onclick="closeButtonDialog()" type="button" 
                      onclick="buttonCloseDialog()">&times;</button>
                  </nav>
              </header>

              <main class="main-dialog" onclick="closeDialogOutsite(event)">
              <h2 id="pkName" class="h2-dialog">Name</h2>
                  <section class="section-dialog"></section>
       
              </main>

              <footer class="footer-dialog" id="dialogFooter" onclick="closeDialogOutsite(event)">
                  <div id="arrowContainer" class="arrow-container" onclick="closeDialogOutsite(event)">
                      <button id="arrowLeft" class="arrow-button" onclick="clickButtonPrevious()" type="button">&#11013</button>
                      <button id="arrowRight" class="arrow-button" onclick="clickButtonForward()" type="button">&#10145</button>
                  </div>
              </footer>
              </div>`;
}

