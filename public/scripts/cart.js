const cart = {};

$(document).ready(function() {

  // Remove Triangles on Click //
  const triangleSuccessFold = function() {
    const triangle1 = $('#triangle-1');
    const triangle2 = $('#triangle-2');
    const triangle3 = $('#triangle-3');
    const triangle4 = $('#triangle-4')
    const triangle5 = $('#triangle-5');
    const triangle6 = $('#triangle-6');
    const logo = $('#initial-logo');

    triangle1.addClass('fade-triangle');
    triangle2.addClass('fade-triangle');
    triangle3.addClass('fade-triangle');
    triangle4.addClass('fade-triangle');
    triangle5.addClass('fade-triangle');
    triangle6.addClass('fade-triangle');
    logo.addClass('fade-triangle');
    setTimeout(()=> {
      triangle1[0].style.display = 'none';
      triangle1.removeClass('slide-in-triangle-1');
      triangle1.removeClass('fade-triangle');
      triangle2[0].style.display = 'none';
      triangle2.removeClass('slide-in-triangle-24');
      triangle2.removeClass('fade-triangle');
      triangle3[0].style.display = 'none';
      triangle3.removeClass('slide-in-triangle-3');
      triangle3.removeClass('fade-triangle');
      triangle4[0].style.display = 'none';
      triangle4.removeClass('slide-in-triangle-24');
      triangle4.removeClass('fade-triangle');
      triangle5[0].style.display = 'none';
      triangle5.removeClass('slide-in-triangle-5');
      triangle5.removeClass('fade-triangle');
      triangle6[0].style.display = 'none';
      triangle6.removeClass('slide-in-triangle-6');
      triangle6.removeClass('fade-triangle');
      logo[0].style.display = 'none';
      logo.removeClass('slide-in-triangle-3');
      logo.removeClass('fade-triangle');
    }, 1000, triangle1, triangle2, triangle3, triangle4, triangle5, triangle6, logo);
  }

  // Display Triangles On Success //
  const triangleSuccessUnfold = function() {
    const triangle1 = $('#triangle-1');
    const triangle2 = $('#triangle-2');
    const triangle3 = $('#triangle-3');
    const triangle4 = $('#triangle-4')
    const triangle5 = $('#triangle-5');
    const triangle6 = $('#triangle-6');
    const logo = $('#initial-logo');
    triangle1[0].style.display = 'block';
    triangle1.addClass('slide-in-triangle-1');
    triangle2[0].style.display = 'block';
    triangle2.addClass('slide-in-triangle-24');
    triangle3[0].style.display = 'block';
    triangle3.addClass('slide-in-triangle-3');
    triangle4[0].style.display = 'block';
    triangle4.addClass('slide-in-triangle-24');
    triangle5[0].style.display = 'block';
    triangle5.addClass('slide-in-triangle-5');
    triangle6[0].style.display = 'block';
    triangle6.addClass('slide-in-triangle-6');
    logo[0].style.display = 'block';
    logo[0].innerHTML = 'SUCCESS!';
    logo.addClass('slide-in-triangle-3');
  }
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
    //if($('.cart-total-amount').val() === `Your cart is empty`)
    if ($('.cart-total-amount')[0].textContent === `Your cart is empty`) {
      $(".payment-container").slideToggle("slow", () => {
        $('.pay-form').val('');
        $('.cart-total-amount')[0].style.color = 'red';
      });
    } else {
      // ----- postData: cart object and value of comment text area ----- //
      //postData: cart object and value of comment text area
      const postData = {
        cart: cart,
        comments: $('textarea#comment').val()
      }
      $.ajax({ method: 'POST', url: '/cart', data: postData })
        .done(() => {
          $(".payment-container").slideToggle("slow", () => {
            $('.pay-form').val('');
          });
          $('.hide-cart').slideToggle('slow', () => {
            $('.cart-items').replaceWith(`<ul class="cart-items">
          </ul>`);
            $('.cart-total-amount').html(`Your cart is empty`);
            for (let item in cart) delete cart[item];
          });
          triangleSuccessUnfold();
        })
        .fail((error) => {
          $('#fail-modal-login').toggleClass('show');
          $(".payment-container").slideToggle("slow");

        });
    }
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
    if (event.target === event.target.closest('.modal')) {
      $(event.target).closest('.modal').toggleClass('show');
    }
  })

  $('#fracture').click(() => {
    if($('#initial-logo')[0].innerHTML === 'SUCCESS!'){
      triangleSuccessFold();
    }
  })

  $('#modal-login').click((event) => {
    $(event.target).closest('.modal').toggleClass('show');
  })



});
