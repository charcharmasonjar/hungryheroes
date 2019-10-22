//A client side script to deal with specials in the slideshow things
$(document).ready(() => {

  //inital slide index, relevant for slideshow position
  let slideIndex = 1;
  
  //populates an html element with data from a menu item on special in the db
  const createSpecialElement = function(item) {
    //current markup for a menu item on special in html
    const markup = `
    <div class="mySlides">
    <img src=${item['image_url']} style="width:100%">
    <div class="title">HUNGRY HEROES</div>
    <div class="text">${item['title']}</div>
  </div>
    `;
    return markup;
  }

  //creates menu items specials for the slideshow and places them in the slideshow container
  const renderSpecialItems = function(items) {
    const specialContainer = $('.slideshow-container');
    for (const item of items) {
      let child = createSpecialElement(item);
      specialContainer.append(child);
    }
  }

  //loads specials from the menu_items and then sets the first item to be visible
  const loadSpecials = function() {
    $.ajax({ method: 'GET', url: '/special/' })
      .then((res) => {
        renderSpecialItems(res);
      })
      //this sets the first item to be visible
      .then(() => {
        showSlides(slideIndex);
      })
  }



  //sets all items to be invisible and then sets the relevant indexed slide to be visible
  const showSlides = function(n) {
    const slides = $(".slideshow-container")[0]['children'];
    if (n > slides.length - 2) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length - 2 }
    for (i = 2; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex + 1].style.display = "block";
  }

  // calling loadSpecials
  loadSpecials();

  //click event captures for the prev and next buttons
  $('.prev').click(function() { showSlides(slideIndex += -1) });
  $('.next').click(function() { showSlides(slideIndex += 1) });

});
