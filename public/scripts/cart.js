$(document).ready(function () {

  //toggles write payment form when add payment button is clicked
  $("#add-payment").click(() => {
    $(".payment-container").slideToggle("fast", () => {
      console.log("done");
    });
  })

});
