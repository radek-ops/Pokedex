
function renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) {

    return /*html*/ `<button id="thumbnailColor" style="background-color:${bg_Color}" class="singel-thumbnail" 
                              type="button" onclick="showPkDialog('${pkTypeName1}','${pkTypeName2}')">
                          <div class="thumbnail-text-container">
                                <span class="thumbnail-text"><b class="pkName">
                                 ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</b>
                               </span>
                           </div> 
                                 <div class="thumbnail-typeNames-img">
                                     <div class="pk-types">
                                           <span id="typeSlot1" class="pkType-name1">${pkTypeName1.charAt(0).toUpperCase() + pkTypeName1.slice(1)}</span>
                                           <span id="typeSlot2${pokemon.id}" class="pkType-name2">${pkTypeName2.charAt(0).toUpperCase() + pkTypeName2.slice(1)}</span>
                                     </div>
                                       <img class="thumbnail-images" 
                                        src="${pokemon.sprites.other.showdown.front_default}" 
                                        alt="Image${pokemon.name}">
                                </div>
                       </button>`;
}

function   dialogHtmlTpl(pokemonId, pokemon, pkTypeName1, pkTypeName2 ){
    return `<div class="dialog-body" onclick="closeDialogOutsite(event)">
    <header id="headline" class="dialog-header" onclick="closeDialogOutsite(event)">
        <nav class="nav-dialog">
            <h2 class="headline-title-dialog">
                <span class="part-1-dialog">Card</span>
                <span class="divider-dialog"></span>
                <span class="part-2-dialog">Pokedex</span>
            </h2>
            <button class="close-button-dialog" onclick="closeButtonDialog()" type="button">&times;</button>
        </nav>
    </header>

    <main class="main-dialog" onclick="closeDialogOutsite(event)">
        <h2 id="pkName" class="h2-dialog">${pokemon.name}</h2>
        <section class="section-dialog">

            <div class="dialog-typeNames-img">
                <div class="dialog-pk-types">
                    <span id="typeSlot1" class="pkType-name1">${pkTypeName1.charAt(0).toUpperCase() + pkTypeName1.slice(1)}</span>
                                           <span id="typeSlot2${pokemon.id}" class="pkType-name2">${pkTypeName2.charAt(0).toUpperCase() + pkTypeName2.slice(1)}</span>
                </div>
                <img class="thumbnail-images" 
                                        src="${pokemon.sprites.other.showdown.front_default}" 
                                        alt="Image${pokemon.name}">
            </div>
        </section>
    </main>

    <footer class="footer-dialog" id="dialogFooter" onclick="closeDialogOutsite(event)">
        <div id="arrowContainer" class="arrow-container" onclick="closeDialogOutsite(event)">
            <button id="arrowLeft" class="arrow-button" onclick="clickButtonPrevious()" type="button">&#11013</button>
            <button id="arrowRight" class="arrow-button" onclick="clickButtonForward()" type="button">&#10145</button>
        </div>
    </footer>
</div>`;
}   
                  
                 
           

