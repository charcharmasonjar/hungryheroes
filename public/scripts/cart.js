const cart = {};

$(document).ready(function () {

  //cart-body when cart header is clicked
  $(".cart-header").click(() => {
    $(".hide-cart").slideToggle("slow", () => {
      //done
    });
  })

  //toggles write payment form when add payment button is clicked
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("slow", () => {
      //done
    });
  })

  $('#checkout').click(() => {
    $.ajax({ method: 'POST', url: '/cart', data: cart })
  })
});

