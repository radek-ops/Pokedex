let BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
let currentPokemons = [];
let pkDetails = [];
let currentUrl = 0;
let pkThumbnail = document.getElementById("thumbnail");
let pkDialog = document.getElementById("dialog");
pkDialog.innerHTML = fullDialogHtml();

function init() {
    loadPkData();
}

function fullDialogHtml() {
    return dialogHtmlHeaderContendTpl() + dialogHtmlSectionContentTpl() + dialogHtmlFooterContentTpl();
}

// Holt Daten asynchron vom Server
async function loadPkData() {
    let response = await fetch(BASE_URL, { method: "GET" });        // Anfrage senden mit standart mässing mit  GET
    let data = await response.json();                            // Antwort in JSON umwandeln
    currentPokemons = data.results;                                     // Liste der Pokémon speichern
    console.log(currentPokemons);

    for (let i = 0; i < currentPokemons.length; i++) {
        let detailResponse = await fetch(currentPokemons[i].url);
        let detaildata = await detailResponse.json();
        console.log(detaildata);


        currentPokemons[i] = detaildata;

        pkThumbnail.innerHTML += renderPokemonCardsTpl(i);
    }
}


function renderPokemonCardsTpl(i) {
    return `<div>
                <button class="singel-thumbnail" type="button"  onclick="showPkDialog(this, ${[i]})">
                       <span>${currentPokemons[i].name}</span>
                           <img  class="thumbnail-images" 
                           src="${currentPokemons[i].sprites.other.showdown.front_default}" 
                        alt="Image${currentPokemons[i].name}">
                 </button>
           </div>`;
}


function showPkDialog(currentThumbnail, i) {

    // let thumbnailContent = currentThumbnail;
    //     thumbnailContent. 

    pkDialog.showModal();

    dialogHtmlHeaderContendTpl(currentThumbnail, i)
}

function closeDialog() {
    pkDialog.close();

}

//function closeDialogOutsite(event) {
//event.stopPropagation();
//}

function dialogHtmlHeaderContendTpl() {
    return `<header id="headline" class="dialog-header" onclick="closeDialogOutsite(event)" >
    <h2 id="imgTitle"></h2>
    <button class="close-button" type="button" onclick="buttonCloseDialog()">&times;</button>
    </header>`;
}


function dialogHtmlSectionContentTpl() {
    return `<section  onclick="closeDialogOutsite(event)"><img id="imgModal" class="lagre_img" src="" alt="" title=""></section>`;
}


function dialogHtmlFooterContentTpl() {
    return `<footer class="arrow_footer" id="dialogFooter">
    <div  id="arrowContainer"  class="arrow_Container" onclick="closeDialogOutsite(event)">
        <button id="arrowLeft"  class="arrow_button" onclick="clickButtonPrevious()"  type="button">&larr;</button>
        <button id="arrowRight" class="arrow_button" onclick="clickButtonForward()" type="button">&rarr;</button>
    </div>
</footer>`;
}
