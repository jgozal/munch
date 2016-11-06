'use strict'

var loadContent = function(route){
  $('body').load(route);
}

$("#addNewIngredient").on('click', function (event) {
  event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
  $.post("ingredients/add", { 
    ingredientName: $('#ingredientName').val(), 
    ingredientPrice: $('#ingredientPrice').val() 
  }, loadContent)
});