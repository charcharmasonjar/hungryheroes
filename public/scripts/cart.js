const cart = {};

$(document).ready(function() {

  // ----- cart-body when cart header is clicked ----- //
  $(".cart-header").click(() => {
    $(".hide-cart").slideToggle("slow", () => {
      //done
    });
  });

  // ----- toggles write payment form when add payment button is clicked ----- //
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("slow", () => {
      //done
    });
  });

  // ----- posts order data to cart route checkout button is clicked ----- //
  $('#checkout').click(() => {

    // ----- postData: cart object and value of comment text area ----- //
    const postData = {
      cart: cart,
      comments: $('textarea#comment').val()
    };
    //if(!req.session.userID)
    $.ajax({ method: 'POST', url: '/cart', data: postData })
      .done(() => {
        console.log('wee');
      })
      .fail((error) => {
        console.log(error.error);
      });
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
