$(document).ready(function () {

  $(".add-to-cart").submit(function (event) {
    event.preventDefault();
    console.log("default prevented");
    // calling loadTweets

  })


  //toggles write payment form when add payment button is clicked
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("fast", () => {
      //done
    });
  })

});
