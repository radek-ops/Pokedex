
function renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) {

    return /*html*/ `<button id="thumbnailBackgroundcolor" style="background-color:${bg_Color}" class="singel-thumbnail" 
                              type="button" onclick="showPkDialog('${pokemon.id}', '${pkTypeName1}', '${pkTypeName2}', '${bg_Color}')">
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

function   dialogHtmlTpl(thisPokemon, pkTypeName1, pkTypeName2, bg_Color){
    return /*html*/ `<div class="dialog-body" onclick="closeDialogOutsite(event)">
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

    <main class="main-dialog" >
        <h2 id="pkName" class="h2-dialog"></h2>
        <section class="section-dialog">
            <div id="dialoglBackgroundcolor" style="background-color:${bg_Color}" class="singel-thumbnail">
                <div class="thumbnail-text-container">
                    <span class="thumbnail-text"><b class="pkName">
                            ${thisPokemon.name.charAt(0).toUpperCase() + thisPokemon.name.slice(1)}</b>
                    </span>
                </div>
                <div class="thumbnail-typeNames-img">
                    <div class="pk-types">
                        <span id="dialogTypeSlot1" class="pkType-name1">${pkTypeName1.charAt(0).toUpperCase() +
                            pkTypeName1.slice(1)}</span>
                        <span id="dialogTypeSlot2"
                            class="pkType-name2">${pkTypeName2.charAt(0).toUpperCase() +
                            pkTypeName2.slice(1)}</span>
                    </div>
                    <img class="thumbnail-images" src="${thisPokemon.sprites.other.showdown.front_default}"
                        alt="Image${thisPokemon.name}">
                </div>
             
           </div>
      </section>
    </main>

  <footer class="footer-dialog" id="dialogFooter" onclick="closeDialogOutsite(event)">
    <div id="arrowContainer" class="arrow-container" onclick="closeDialogOutsite(event)">
        <button id="arrowLeft" class="arrow-button" onclick="clickButtonPrevious('${thisPokemon.id}')" type="button">&#11013</button>
        <button id="arrowRight" class="arrow-button" onclick="clickButtonNext('${thisPokemon.id}')" type="button">&#10145</button>
    </div>
  </footer>
</div>`;
}   
                  
                 
           

