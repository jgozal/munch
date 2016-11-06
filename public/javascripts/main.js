'use strict'

// promise reject callback

let onError = function (data, status) {
  console.log("status", status);
  console.log("error", data);
};

$("#addNewIngredient").on('click', function (event) {
  event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
  $.post("ingredients/add", { ingredientName: $('#ingredientName').val(), ingredientPrice: $('#ingredientPrice').val() }) // returns promise
    .done(function (data, status) {
      $("#result").append("<li>Ingredient: " + data.name + ", Price: $" + data.price + ", In Stock: " + data.inStock + '</li>');
    }) // resolves promise
    .error(onError); // rejects promise
});