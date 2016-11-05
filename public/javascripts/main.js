'use strict'

// promise resolve and reject callbacks

let onSuccess = function (data, status) {
  $("#result").html(data);
};

let onError = function (data, status) {
  console.log("status", status);
  console.log("error", data);
};

$("#addNewIngredient").on('click', function (event) {
  event.stopImmediatePropagation() // avoids multiple requests/events from firing up on button click
  $.post("ingredients/add", {ingredientName: $('#ingredientName').val(), ingredientPrice: $('#ingredientPrice').val()}) // returns promise
    .done(onSuccess) // resolves promise
    .error(onError); // rejects promise
});