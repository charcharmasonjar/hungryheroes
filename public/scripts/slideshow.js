// ~~~~~ A client side script to deal with specials in the slideshow things ~~~~~ //
$(document).ready(() => {

  // ----- inital slide index, relevant for slideshow position ----- //
  let slideIndex = 0;

  // ----- populates an html element with data from a menu item on special in the db ----- //
  const createSpecialElement = function(item) {
    // ----- current markup for a menu item on special in html ----- //
    const markup = `
    <div class="mySlides fade">
    <img src=${item['image_url']} style="width:100%">
    <div class="title">HUNGRY HEROES</div>
    <div class="text">${item['title']}</div>
  </div>
    `;
    return markup;
  };

  // ----- creates menu items specials for the slideshow and places them in the slideshow container ----- //
  const renderSpecialItems = function(items) {
    const specialContainer = $('.slideshow-container');
    for (const item of items) {
      let child = createSpecialElement(item);
      specialContainer.append(child);
    }
  };

  // ----- loads specials from the menu_items and then sets the first item to be visible ----- //
  const loadSpecials = function() {
    $.ajax({ method: 'GET', url: '/special/' })
      .then((res) => {
        renderSpecialItems(res);
      })
      // ----- this sets the first item to be visible ----- //
      .then(() => {
        showSlides();
      });
  };



  // ----- sets all items to be invisible and then sets the relevant indexed slide to be visible ----- //
  const showSlides = function() {
    let i;
    const slides = $(".mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1;}
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3600); // ----- Change image every 2 seconds ----- //
  };

  // ----- calling loadSpecials ----- //
  //loadSpecials();



  // ----- creates menu items specials for the slideshow and places them in the slideshow container ----- //
  const renderStockPhotos = function() {
    const specialContainer = $('.slideshow-container');
    const markup1 = `
    <div class="mySlides fade">
    <img src=${'https://github.com/charcharmasonjar/hungryheroes/blob/master/docs/stock-1.JPG?raw=true'} style="width:100%">
    <div class="title">HUNGRY HEROES</div>
  </div>
    `;
    const markup2 = `
    <div class="mySlides fade">
    <img src=${'https://github.com/charcharmasonjar/hungryheroes/blob/master/docs/stock-2.JPG?raw=true'} style="width:100%">
    <div class="title">HUNGRY HEROES</div>
  </div>
    `;
    const markup3 = `
    <div class="mySlides fade">
    <img src=${'https://github.com/charcharmasonjar/hungryheroes/blob/master/docs/stock-3.jpg?raw=true'} style="width:100%">
    <div class="title">HUNGRY HEROES</div>
  </div>
    `;
    specialContainer.append(markup1);
    specialContainer.append(markup2);
    specialContainer.append(markup3);
  };

  // ----- loads specials from the menu_items and then sets the first item to be visible ----- //
  const loadStock = function() {
    renderStockPhotos();
    // ----- this sets the first item to be visible ----- //
    showSlides();
  };

  loadStock();
});
