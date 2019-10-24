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

  $('#checkout').click(() => {
    //if(!req.session.userID)
    $.ajax({ method: 'POST', url: '/cart', data: cart })
      .done(() => {
        console.log('wee');
      })
      .fail((error) => {
        console.log(error.error);
      })
 //for modal success/error then do stuff below in .then as well
  // $(".payment-container").slideToggle("slow", () => {
  //   $('.pay-form').val('');
  // });
  // $('.hide-cart').slideToggle('slow', () =>{
  //   $('.cart-items').replaceWith(`<ul class="cart-items">
  //   </ul>`);
  //   $('.cart-total-amount').html(`Your cart is empty`);
  //   for (var item in cart) delete cart[item];
  //   console.log(cart);
  // });
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



});
