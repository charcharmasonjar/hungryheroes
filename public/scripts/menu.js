//A client side script to deal with menu things
$(document).ready(() => {


  const createMenuItemElement = function(item) {

    const markup = `
  <li class="menu-item">
    <div class="menu-image">
      <img
        src="https://www.cactusclubcafe.com/wp-content/uploads/2019/05/051419_TunaPokeBowl_Header_1160px_500px_FINAL2.jpg"
        alt="">
    </div>
    <div class="menu-item-text">
      <h2 class="menu-item-title">Wrap, Single Salad & Bottled Water</h2>
      <p class="menu-item-description">Your choice of wrap & salad.</p>
    </div>
      <span class="menu-item-price ">$9.95</span>
    </li><!-- /.menu-item --></li>
    `;
    return markup;
  }

  const renderMenuItems = function(items) {
    const ul = $('#for-the-table');
    for (const tweet of tweets) {
      let article = createTweetElement(tweet);
      section.prepend(article);
    }
  }
});
