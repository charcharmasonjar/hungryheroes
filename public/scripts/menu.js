//A client side script to deal with menu things
$(document).ready(() => {
  //populates an html element with data from a menu item in the db
  const createMenuItemElement = function(item) {
    //current markup for a menu item in html
    const markup = `
  <li class="menu-item">
    <div class="menu-image">
      <img
        src=${item['image_url']}
        alt="">
    </div>
    <div class="menu-item-text">
      <h2 class="menu-item-title">${item['title']}</h2>
      <p class="menu-item-description">${item['description']}</p>
    </div>
      <span class="menu-item-price ">$${item['price'] / 100}</span>
    </li><!-- /.menu-item --></li>
    `;
    return markup;
  };
  //creates menu item html elements and attaches them to the correct list in the view
  const renderMenuItems = function(items) {
    console.log(items);
    //each course list has a container id
    const ul_1 = $('#for-the-table-container');
    const ul_2 = $('#greens-container');
    const ul_3 = $('#bowls-container');
    const ul_4 = $('#casual-container');
    const ul_5 = $('#seafood-container');
    const ul_6 = $('#pasta-container');
    const ul_7 = $('#chicken-container');
    const ul_8 = $('#burgers-sandwiches-container');
    const ul_9 = $('#desserts-container');
    for (const item of items) {
      let li = createMenuItemElement(item);
      if (item['course_id'] === 1) { //for the table
        ul_1.append(li);
      } else if (item['course_id'] === 2) { //greens
        ul_2.append(li);
      } else if (item['course_id'] === 3) {//bowls
        ul_3.append(li);
      } else if (item['course_id'] === 4) {//casual
        ul_4.append(li);
      } else if (item['course_id'] === 5) {//pasta
        ul_5.append(li);
      } else if (item['course_id'] === 6) {//seafood
        ul_6.append(li);
      } else if (item['course_id'] === 7) {//chicken
        ul_7.append(li);
      } else if (item['course_id'] === 8) {//burgers and sandwiches
        ul_8.append(li);
      } else if (item['course_id'] === 9) {//desserts
        ul_9.append(li);
      }
    }
  };
  //toggles sides order when menu item is clicked
  $(".menu-items").click(() => {
    $("#sides-container").slideToggle("slow", () => {
      //done
    });
  });

  const loadMenu = function() {
    $.ajax({ method: 'GET', url: '/menu/' })
      .then((res) => {
        renderMenuItems(res);
      })
  };
  // calling loadTweets
  loadMenu();
});
