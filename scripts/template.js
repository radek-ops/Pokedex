
function renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) {

    return  /*html*/`<button id="thumbnailBackgroundcolor" style="background-color:${bg_Color}" class="singel-thumbnail" type="button"
    onclick="showPkDialog('${pokemon.id}', '${pkTypeName1}', '${pkTypeName2}', '${bg_Color}')">
    <div class="thumbnail-name-container">
        <span class="thumbnail-name"><b class="pkName">
                ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
        </span>
    </div>
    <div class="thumbnail-typeNames-img">
        <div class="pk-types">
            <span id="typeSlot1" class="pkType-name1">${pkTypeName1.charAt(0).toUpperCase() +
        pkTypeName1.slice(1)}</span>
            <span id="typeSlot2${pokemon.id}" class="pkType-name2">${pkTypeName2.charAt(0).toUpperCase() +
        pkTypeName2.slice(1)}</span>
        </div>
        <img class="thumbnail-images" src="${pokemon.sprites.other.showdown.front_default}" alt="Image${pokemon.name}">
    </div>
</button>`;
}

function dialogHeaderTpl() {
    return /*html*/`<div class="dialog-body" onclick="closeDialogOutsite(event)">
    <header id="headline" class="dialog-header" onclick="closeDialogOutsite(event)">
        <nav class="nav-dialog">
            <h2 class="headline-title-dialog">
                <span class="part-1-dialog">Card</span>
                <span class="divider-dialog"></span>
                <span class="part-2-dialog">Pokedex</span>
            </h2>
            <button class="close-button-dialog" onclick="closeButtonDialog()" type="button">&times;</button>
        </nav>
    </header>`;
}

function dialogUpperMainSectionTpl(thisPokemon, pkTypeName1, pkTypeName2, bg_Color) {
    return /*html*/`<main class="main-dialog">
    <h2 id="pkName" class="h2-dialog"></h2>
    <section class="upper-section-dialog">
        <div id="dialoglBackgroundcolor" style="background-color:${bg_Color}" class="upper-section-container">
            <div class="dialog-name-container">
                <span class="dialog-name"><b class="dialog-pkName">${thisPokemon.name.charAt(0).toUpperCase() +
        thisPokemon.name.slice(1)}</b></span>
                <div class="dialog-pk-types">
                    <span id="dialogTypeSlot1" class="dialog-pkType-name1">${pkTypeName1.charAt(0).toUpperCase() +
        pkTypeName1.slice(1)}</span>
                    <span id="dialogTypeSlot2" class="dialog-pkType-name2">${pkTypeName2.charAt(0).toUpperCase() +
        pkTypeName2.slice(1)}</span>
                </div>
            </div>
            <div class="dialog-img-container">
                <img class="dialog-images" src="${thisPokemon.sprites.other['official-artwork'].front_default}"
                    alt="Image${thisPokemon.name}">
            </div>
        </div>
    </section>`;

}

function dialogLowerMainSectionTpl(thisPokemon) {
    return /*html*/` <section class="lower-section-dialog">
    <div class="lower-container">
        <button type="button" onclick="showAboutInDialog('${thisPokemon}')"><span>About</span></button>
        <button type="button" onclick="showStatesInDialog('${thisPokemon}')"><span>States</span></button>
        <button type="button" onclick="showEvolutionInDialog('${thisPokemon}')"><span>Evolution</span></button>
        <button type="button" onclick="showMovesInDialog('${thisPokemon}')"><span>Moves</span></button>
    </div>
    <div class=about-container>
        <table id="table-about" class="about">
            <tbody>
                <tr>
                    <td><b>ID:</b></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

</main>
<footer class="footer-dialog" id="dialogFooter" onclick="closeDialogOutsite(event)">
    <div id="arrowContainer" class="arrow-container" onclick="closeDialogOutsite(event)">
        <button id="arrowLeft" class="arrow-button" onclick="clickButtonPrevious('${thisPokemon.id}')"
            type="button">&#11013</button>
        <button id="arrowRight" class="arrow-button" onclick="clickButtonNext('${thisPokemon.id}')"
            type="button">&#10145</button>
    </div>
</footer>
</div>`;
}




