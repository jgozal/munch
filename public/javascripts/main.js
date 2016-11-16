'use strict'

var loadContent = function (route) {
  $('body').load(route);
}

// ingredient manager
var manageIngredients = function (id, url, askInfo) {
  $(id).on('click', function (event) {
    event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
    let info = askInfo();
    $.post(url, {
      ingredientName: info.name,
      ingredientPrice: info.price,
      ingredientNewName: info.newName !== '' ? info.newName: info.name,
      ingredientNewPrice: info.newPrice !== '' ? info.newPrice: $('.ingredients:contains(ketchup)').html().replace(/[^\d.-]/g, '') // this is insane, I shouldn't be doing this'
    }, loadContent)
  });
}

// adds new ingredient and refreshes ingredient list
manageIngredients('#addNewIngredient', 'ingredients/add', function () {
  return {
    name: prompt('Enter the name of the ingredient you would like to add.'),
    price: prompt('Enter the price of the new ingredient.')
  }
});
// edits ingredient and refreshes ingredient list
manageIngredients('#editIngredient', 'ingredients/edit', function () {
  return {
    name: prompt('Enter the name of the ingredient you would like to edit.'),
    newName: prompt('Enter the new name of the ingredient.\nLeave blank if there is no change.'),
    newPrice: prompt('Enter the new price of the ingredient.\nLeave blank if there is no change.')
  }
});
// disables ingredient and refreshes ingredient list
manageIngredients('#disableIngredient', 'ingredients/disable', function() {
  return {
    name: prompt('Enter the name of the ingredient that is in-stock/out-of-stock.')
  }
})
