
function renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) {

    return  /*html*/`<button id="thumbnailBackgroundcolor" style="background-color:${bg_Color}" class="singel-thumbnail" type="button"
    onclick="showPkDialog(${pokemon.id})">
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

function dialogUpperSectionTpl(thisPokemon, pkTypeName1, pkTypeName2, bg_Color, pkcategory ) {
    return /*html*/`<main class="main-dialog">
    <h2 id="pkName" class="h2-dialog"></h2>
    <section class="upper-section-dialog">
        <div id="dialogBackgroundcolor" style="background-color:${bg_Color}" class="upper-section-container">
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
    </section>
     <section class="about-section-dialog">
     <div class="about-lower-container">
        <button type="button" class="dialogButtons" autofocus onclick="showAboutInDialog(${thisPokemon.id}, '${pkcategory}' )"><span>About</span></button>
        <button type="button" class="dialogButtons" onclick="showStatesInDialog(${thisPokemon.id})"><span>States</span></button>
        <button type="button" class="dialogButtons" onclick="showEvolutionInDialog(${thisPokemon.id})"><span>Evolution</span></button>
        <button type="button" class="dialogButtons" onclick="showMovesInDialog(${thisPokemon.id})"><span>Moves</span></button>
    </div>
    </section>`;
}

function dialogAboutSectionTpl(thisPokemon, abilities, pkcategory) {
    return /*html*/`<section>
    <div class="about-content">
        <table id="table-about" class="about">
            <tbody>
                <tr>
                    <td><b>ID: </b>${thisPokemon.id}</td>
                </tr>
                <tr>
                    <td><b>Height: </b>${thisPokemon.height}</td>
                </tr>
                <tr>
                    <td><b>Weight: </b>${thisPokemon.weight}</td>
                <tr>
                    <td><b>Base-experience: </b>${thisPokemon.base_experience}</td>
                </tr>
                </tr>
                <td><b>Category: </b>${pkcategory}</td>
                </tr>
                <tr>
                    <td id="abilities${thisPokemon.id}"><b>Abilities: </b>${abilities.ability1.charAt().toUpperCase() +
                        abilities.ability1.slice(1)}</td>
                </tr>
                <tr>
                    <td id="abilities${thisPokemon.id}">${abilities.ability2.charAt().toUpperCase() +
                        abilities.ability2.slice(1)}</td>
                </tr>
                <tr>
                    <td id="abilities${thisPokemon.id}">${abilities.ability3.charAt().toUpperCase() +
                        abilities.ability3.slice(1)}</td>
                </tr>
            </tbody>
        </table>

    </div>
</section> `;
}

function dialogStatesSectionTpl(thisPokemon) {
    return /*html*/` <section>   
    <div class="states-content">
        <table id="table-states" class="states">
            <tbody>
                                 <tr>
                    <td><b>${thisPokemon.stats[0].stat.name.charAt().toUpperCase() + thisPokemon.stats[0].stat.name.slice(1)}</b>: ${thisPokemon.stats[0].base_stat}</td>
                 </tr>   
                 <tr>
                    <td><b>${thisPokemon.stats[1].stat.name.charAt().toUpperCase() + thisPokemon.stats[1].stat.name.slice(1)}</b>: ${thisPokemon.stats[1].base_stat} </td>
                 </tr>
                  <tr>
                    <td><b>${thisPokemon.stats[2].stat.name.charAt().toUpperCase() + thisPokemon.stats[2].stat.name.slice(1)}</b>: ${thisPokemon.stats[2].base_stat} </td>
                 </tr>
                  <tr>
                    <td><b>${thisPokemon.stats[3].stat.name.charAt().toUpperCase() + thisPokemon.stats[3].stat.name.slice(1)}</b>: ${thisPokemon.stats[3].base_stat} </td>
                 </tr>
                  <tr>
                    <td><b>${thisPokemon.stats[4].stat.name.charAt().toUpperCase() + thisPokemon.stats[4].stat.name.slice(1)}</b>: ${thisPokemon.stats[4].base_stat} </td>
                 </tr>
                  <tr>
                    <td><b>${thisPokemon.stats[5].stat.name.charAt().toUpperCase() + thisPokemon.stats[5].stat.name.slice(1)}</b>: ${thisPokemon.stats[5].base_stat} </td>
            </tbody>
        </table>
      </div>
   </section>`;
}

function dialogEvolutionSectionTpl(thisPokemon, evoNames) {
    return /*html*/` <section>    
    <div class="evolution-content">
        <table id="table-evolution" class="evolution">
            <tbody>
                  <tr>
                    <td><b>Evolotion-chain:</b></td>
                 </tr>   
                 <tr>
                    <td>${evoNames[0] + ","}</td>
                 </tr>
                  <tr>
                    <td>${evoNames[1] + ","}</td>
                 </tr>
                  <tr>
                    <td>${evoNames[2] + ","}</td>
                 </tr>
                  <tr>
             </tbody>
        </table>
      </div>
   <section>`;
}

function dialogMovesSectionTpl(thisPokemon) {
    return /*html*/`<section >    
    <div class="moves-content">
        <table  class="moves">
            <tbody id="table-moves">
                  <tr>
                    <td><b>Moves: </b></td>
                 </tr>   
            </tbody>
        </table>
     </div>
</section>`;
}

function dialogFooterTpl(thisPokemon){
    return `</main>
<footer class="footer-dialog" id="dialogFooter" onclick="closeDialogOutsite(event)">
    <div id="arrowContainer" class="arrow-container" onclick="closeDialogOutsite(event)">
        <button id="arrowLeft" class="arrow-button" onclick="clickButtonPrevious(${thisPokemon.id})"
            type="button">&#11013</button>
        <button id="arrowRight" class="arrow-button" onclick="clickButtonNext(${thisPokemon.id})"
            type="button">&#10145</button>
    </div>
</footer>
</div>`;
}

function renderSingelMoveTpl(i, movesNames) {
    return ` <tr id="${i}">
                    <td>${movesNames[i]}</td>
              </tr> `;
}


