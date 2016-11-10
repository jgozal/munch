'use strict'

var loadContent = function (route) {
  $('body').load(route);
}

// ingredient manager
var manageIngredients = function (id, url) {
  $(id).on('click', function (event) {
    event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
    $.post(url, {
      ingredientName: $('#ingredientName').val(),
      ingredientPrice: $('#ingredientPrice').val()
    }, loadContent)
  });
}

// adds new ingredient and refreshes ingredient list
manageIngredients('#addNewIngredient','ingredients/add');
// edits ingredient and refreshes ingredient list
manageIngredients('#editIngredient','ingredients/edit');
// disables ingredient and refreshes ingredient list
manageIngredients('#disableIngredient', 'ingredients/disable')
