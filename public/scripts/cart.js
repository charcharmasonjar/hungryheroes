const cart = {};

$(document).ready(function() {

  //cart-body when cart header is clicked
  $(".cart-header").click(() => {
    $(".hide-cart").slideToggle("slow", () => {
      //done
    });
  });

  //toggles write payment form when add payment button is clicked
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("slow", () => {
      //done
    });
  });

  //posts order data to cart route checkout button is clicked
  $('#checkout').click(() => {
    $.ajax({ method: 'POST', url: '/cart', data: cart })
      .done(() => {
        $(".payment-container").slideToggle("slow", () => {
          $('.pay-form').val('');
        });
        $('.hide-cart').slideToggle('slow', () =>{
          $('.cart-items').replaceWith(`<ul class="cart-items">
          </ul>`);
          $('.cart-total-amount').html(`Your cart is empty`);
          for (var item in cart) delete cart[item];
        });
        $("#success-modal").toggleClass('show');
      })
      .fail((error) => {
        $('#fail-modal').toggleClass('show');
      })
});

$('#payment-header').click(() => {
  $(".payment-container").slideToggle("slow", () => {
    //done
  });
});

$('#add-comment').click(() => {
  $('.comment-container').slideToggle("slow");
});

$('#comment-header').click(() => {
  $('.comment-container').slideToggle("slow");
});

$('.modal').click((event) => {
  $(event.target).toggleClass('show');
})



});
