/* ~~~~~~~ app.js ~~~~~~~ */

$(document).ready(function() {

  /* ======= Nav Listeners ======= */

  /* ------- User Login (not secure atm) ------- */
  $('#login').click(function() {
    const nameSpace = $('#user-name');
    $.ajax({
      method: "GET",
      url: "/users/login"
    }).then((users) => {
      $(this).hide('slow', () => {
        nameSpace.text(`Welcome back ${users.users['0'].first_name}.`);
        $('#logout').show('slow', () => {
          nameSpace.fadeIn(300);
        });
      });
    });
  })

  /* ------- User Logout ------- */
  $('#logout').click(function() {
    $.ajax({
      method: "GET",
      url: "/users/logout"
    })
    .then(() => {
      console.log('we made it');
    });
      $('#user-name').fadeOut(100, () => {
        $(this).hide('slow', () => {
          $('#login').show('slow');
        });
      });
    });
});
