const cart = {};

$(document).ready(function () {



  $(".add-order").submit(function (event) {
    event.preventDefault();
    console.log("default prevented");



  })


  //toggles write payment form when add payment button is clicked
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("fast", () => {
      //done
    });
  })

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
