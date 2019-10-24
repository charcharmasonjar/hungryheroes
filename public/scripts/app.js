/* ~~~~~~~ app.js ~~~~~~~ */

$(document).ready(function() {

  /* ======= Nav Listeners ======= */

  /* ------- User Login (not secure atm) ------- */
  $('#login').click(function() {
    const nameSpace = $('#user-name');
    const numberSpace = $('#phone-changer-input');
    $.ajax({
      method: "GET",
      url: "/users/login"
    }).then((users) => {
      $(this).hide('slow', () => {
        nameSpace.text(`Welcome back ${users.users['0'].first_name}.`);
        numberSpace.attr('placeholder', `${users.users['0'].phone}`);
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
      });
    $('#phone-changer').slideUp(200, () => {

      $('#user-name').fadeOut(200, () => {
        $('#user-name').text(``);
        $('#phone-changer-input').attr('placeholder', ``);
        $(this).hide('slow', () => {
          $('#login').show('slow');
        });
      });
    });
  });

  $('#user-name').click(function() {
    $('#phone-changer').slideToggle('slow');
  })


  $('#phone-changer button').click(function() {
    const input = $('#phone-changer-input').val();
    $('#phone-changer').slideUp('slow', ()=>{
      $('#phone-changer-input').val('');
    });
    if (Number.isInteger(Number(input, 10))) {
      $.ajax({
        method: 'POST',
        url: '/users/updatePN',
        data:{ phone: input }
      }).then(() => {
        $('#phone-changer-input').attr('placeholder', input);
      });
    } else {
      console.log('bad number'); //needs more here
    }
  })

});
