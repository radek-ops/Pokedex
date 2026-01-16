
function renderThumbnailsContentTpl(pokemon, pkTypeName1, pkTypeName2, bg_Color) {

    return /* html */ `<button id="thumbnailColor" style="background-color:${bg_Color}" class="singel-thumbnail" type="button" onclick="showPkDialog(this, ${pokemon.id})">
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