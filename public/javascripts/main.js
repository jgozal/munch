'use strict'

// promise resolve and reject callbacks

var onSuccess = function (data, status) {
  $("#result").append("<li>Ingredient: " + data.name + ", Price: $" + data.price + ", In Stock: " + data.inStock + '</li>'); 
};

var onError = function (data, status) {
  console.log("status", status);
  console.log("error", data);
};

$("#addNewIngredient").on('click', function (event) {
  event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
  $.post("ingredients/add", {ingredientName: $('#ingredientName').val(), ingredientPrice: $('#ingredientPrice').val()}) // returns promise
    .done(onSuccess) // resolves promise
    .error(onError); // rejects promise
});