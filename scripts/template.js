function renderThumbnailsContentTpl(i, pkTypeName1, pkTypeName2, bg_Color) {

    return `<button id="thumbnailColor" style="background-color:${bg_Color}" class="singel-thumbnail" type="button" onclick="showPkDialog(this, ${[i]})">
                     <div class="thumbnail-text-container">
                          <span class="thumbnail-text"><b class="pkName">${currentPokemonsDetails[i].name.charAt(0).toUpperCase() + currentPokemonsDetails[i].name.slice(1)}</b></span>
                            <div class="pk-types">
                               <span id="typeSlot1" class="pkType-name">${pkTypeName1.charAt(0).toUpperCase() + pkTypeName1.slice(1)}</span>
                              <span id="typeSlot2" class="pkType-name">${pkTypeName2.charAt(0).toUpperCase() + pkTypeName2.slice(1)}</span>
                           </div>
                     </div>
                      <img class="thumbnail-images" 
                            src="${currentPokemonsDetails[i].sprites.other.showdown.front_default}" 
                            alt="Image${currentPokemonsDetails[i].name}">
             </button>`;
}