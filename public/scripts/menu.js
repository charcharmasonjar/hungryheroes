//A client side script to deal with menu things
$(document).ready(() => {

  const createMenuItemElement = function(item) {

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
      <span class="menu-item-price ">$9.95</span>
    </li><!-- /.menu-item --></li>
    `;
    return markup;
  }

  const renderMenuItems = function(items) {
    console.log(items);
    const ul_1 = $('#for-the-table-container');
    const ul_2 = $('#greens-container');
    const ul_3 = $('#bowls-container');
    const ul_4 = $('#casual-container');
    const ul_5 = $('#seafood-container');
    //const ul_6 = $('#');
    for (const item of items) {
      let li = createMenuItemElement(item);
      if(item['course_id'] === 1){
        ul_1.append(li);
      } else if(item['course_id'] === 2) {
        ul_2.append(li);
      } else if(item['course_id'] === 3) {
        ul_3.append(li);
      } else if(item['course_id'] === 4) {
        ul_4.append(li);
      } else if(item['course_id'] === 5) {
        ul_5.append(li);
      }
    }
  }

  const loadMenu = function() {
    $.ajax({ method: 'GET', url: '/menu/' })
      .then((res) => {
        renderMenuItems(res);
      })
  }
  // calling loadTweets
  loadMenu();
});
