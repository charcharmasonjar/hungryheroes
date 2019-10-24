$(document).ready(function() {
  const nameSpace = $('#user-name');
  const numberSpace = $('#phone-changer-input');
    $.ajax({
      method: "GET",
      url: "/users/loggedin"
    }).then((users) => {
      nameSpace.text(`Welcome back ${users.users['0'].first_name}.`);
      numberSpace.attr('placeholder', `${users.users['0'].phone}`);
      setTimeout(() => {
      $('#logout').fadeIn(300);
      nameSpace.fadeIn(300);
      $('#logo').fadeIn(300);
    });
    }, 1000, nameSpace);
});
