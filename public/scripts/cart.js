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
    $.ajax({ method: 'POST', url: '/cart', data: cart})})
});

const twilioOrder = {
  name: $name,
  phoneNumber: users.phone,
  orderItems: finalOrderObj.quantity_of_items,
  totalPrice: $totalPrice,
  comments: $comments
}

if ($name && users.phone) {

  $.ajax({
    method: "POST",
    url: "/api/users",
    data: user
  })
    .done(function(id) {
      finalOrderObj['user_id'] = id[0];
      $.ajax({
        method: "POST",
        url: "/api/orders",
        data: finalOrderObj
      })
        .done(function(orderId) {
          twilioOrder['orderId'] = orderId[0];
          $.ajax({
            method: "POST",
            url: "/sms",
            data: twilioOrder
          });
        });
    });

}
