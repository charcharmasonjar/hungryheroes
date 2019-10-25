$(document).ready(function() {
  //----- Fade Option -----//
  // const triangle1 = $('#triangle-1');
  // setTimeout(()=> {
  //   triangle1.addClass('fade-triangle');
  //   setTimeout(()=> {
  //     triangle1[0].style.display = 'none';
  //   }, 2000, triangle1);
  // }, 100, triangle1);

  // const triangle2 = $('#triangle-2');
  // const triangle4 = $('#triangle-4')
  // setTimeout(()=> {
  //   triangle2.addClass('fade-triangle');
  //   triangle4.addClass('fade-triangle');
  //   setTimeout(()=> {
  //     triangle2[0].style.display = 'none';
  //     triangle4[0].style.display = 'none';
  //   }, 2000, triangle2, triangle4);
  // }, 1000, triangle2, triangle4);

  // const triangle5 = $('#triangle-5');
  // setTimeout(()=> {
  //   triangle5.addClass('fade-triangle');
  //   setTimeout(()=> {
  //     triangle5[0].style.display = 'none';
  //   }, 2000, triangle5);
  // }, 2000, triangle5);

  // const triangle6 = $('#triangle-6');
  // setTimeout(()=> {
  //   triangle6.addClass('fade-triangle');
  //   setTimeout(()=> {
  //     triangle6[0].style.display = 'none';
  //   }, 2000, triangle6);
  // }, 3000, triangle6);

  // const triangle3 = $('#triangle-text');
  // setTimeout(()=> {
  //   triangle3.addClass('fade-triangle');
  //   setTimeout(()=> {
  //     triangle3[0].style.display = 'none';
  //   }, 2000, triangle3);
  // }, 4000, triangle3);

  const triangle1 = $('#triangle-1');
  setTimeout(()=> {
    triangle1.addClass('slide-triangle-1');
    setTimeout(()=> {
      triangle1[0].style.display = 'none';
    },2000, triangle1);
  }, 2000, triangle1);

  const triangle2 = $('#triangle-2');
  const triangle4 = $('#triangle-4')
  setTimeout(()=> {
    triangle2.addClass('slide-triangle-24');
    triangle4.addClass('slide-triangle-24');
    setTimeout(()=> {
      triangle2[0].style.display = 'none';
      triangle4[0].style.display = 'none';
    }, 2000, triangle2, triangle4);
  }, 2000, triangle2, triangle4);

  const triangle5 = $('#triangle-5');
  setTimeout(()=> {
    triangle5.addClass('slide-triangle-5');
    setTimeout(()=> {
      triangle5[0].style.display = 'none';
    }, 2000, triangle5);
  }, 2000, triangle5);

  const triangle6 = $('#triangle-6');
  setTimeout(()=> {
    triangle6.addClass('slide-triangle-6');
    setTimeout(()=> {
      triangle6[0].style.display = 'none';
    }, 2000, triangle6);
  }, 2000, triangle6);

  const triangle3 = $('#triangle-3');
  const logo = $('#initial-logo');
  setTimeout(()=> {
    triangle3.addClass('slide-triangle-3');
    logo.addClass('slide-triangle-3');
    setTimeout(()=> {
      triangle3[0].style.display = 'none';
      logo[0].style.display = 'none';
    }, 2000, triangle3, logo);
  }, 2000, triangle3, logo);

});
