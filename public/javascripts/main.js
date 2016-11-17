'use strict'

var loadContent = function (route) {
  $('body').load(route);
}

// general request manager
var requestManager = function (id, url, method, askInfo) {
  $(id).on('click', function (event) {
    event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
    let info = askInfo();
    $.ajax({
      type: method,
      url: url,
      data: {
        customerName: info.customerName,
        ingredientName: info.ingredientName,
        ingredientPrice: info.price,
        ingredientNewName: info.newName !== '' ? info.newName : info.ingredientName,
        ingredientNewPrice: info.newPrice !== '' ? info.newPrice : $('.ingredientList:contains(' + info.ingredientName + ')').html().replace(/[^\d.-]/g, ''), // this is insane, I shouldn't be doing this'
        orderNumber: $(this).parent().index()
      },
      success: loadContent
    })
  });
}

// adds new ingredient and refreshes ingredient list
requestManager('#addNewIngredient', 'ingredients/add', 'POST', function () {
  return {
    ingredientName: prompt('Enter the name of the ingredient you would like to add.'),
    price: prompt('Enter the price of the new ingredient.')
  }
});
// edits ingredient and refreshes ingredient list
requestManager('#editIngredient', 'ingredients/edit', 'POST', function () {
  return {
    ingredientName: prompt('Enter the name of the ingredient you would like to edit.'),
    newName: prompt('Enter the new name of the ingredient.\nLeave blank if there is no change.'),
    newPrice: prompt('Enter the new price of the ingredient.\nLeave blank if there is no change.')
  }
});
// disables ingredient and refreshes ingredient list
requestManager('#disableIngredient', 'ingredients/disable', 'POST', function () {
  return {
    ingredientName: prompt('Enter the name of the ingredient that is in-stock/out-of-stock.')
  }
})
// make an order sending an array of ingredients
requestManager('#makeOrder', 'order/make', 'POST', function () {
  return {
    customerName: $('#customerName').val(),
    ingredientName: JSON.stringify(jQuery.makeArray($(".ingredientOrder:checkbox:checked")).map(function (ingredient) { return ingredient.name }))
  }
})
// complete order
requestManager('.completeOrder', 'kitchen/complete', 'DELETE', function () {
  return {};
})

