//A client side script to deal with menu things
$(document).ready(() => {
  //populates an html element with data from a menu item in the db
  const createSpecialElement = function(item) {
    //current markup for a menu item in html
    const markup = `
    <div class="mySlides fade">
    <img src=${item['image_url']} style="width:100%">
    <div class="text">${item['title']}</div>
  </div>
    `;
    return markup;
  }

  const createDotElement = function(num) {
    return `<span class="dot" onclick="currentSlide(${num})"></span>`;
  }
  //creates menu item html elements and attaches them to the correct list in the view
  const renderSpecialItems = function(items) {
    //each course list has a container id
    const specialContainer = $('.slideshow-container');
    const dotContainer = $('.dot-container');
    let dotNum = 1;
    for (const item of items) {
      let child = createSpecialElement(item);
      let dot = createDotElement(dotNum);
      specialContainer.append(child);
      dotContainer.append(dot);
      dotNum++;
    }
    // specialContainer.append(child);
    // specialContainer.append(child);
  }

  const loadSpecials = function() {
    $.ajax({ method: 'GET', url: '/special/' })
      .then((res) => {
        renderSpecialItems(res);
      })
  }
  // calling loadTweets
  loadSpecials();
});
