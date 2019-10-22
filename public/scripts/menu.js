//A client side script to deal with menu things
$(document).ready(() => {
  //populates an html element with data from a menu item in the db
  const createMenuItemElement = function(item) {
    //current markup for a menu item in html
    const markup = `
  <li class="menu-item">
  <div class="menu-item-container">
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
    </div>
      <section class="sides-container" id="sides-container-${item['id']}">
      <div class="menu-item" id="sides-item">
      <div class="sides-header">
      <span class="" style="font-size: 20px;font-weight: 500;color:white">EXTRAS</span>
      <br>
      <span class="" style="font-size: 12px;color: white">Would you like to add a side for your meal?</span>
      </div>
      <div class="sides-body">
      <div class="form-order">
      <form class="form-body">
      <div class="form-row" style="">
      <label class="form-label">
      <span class="" style="color: rgba(14,18,25,1);font-size: 20px;">Add a side</span>
      </label>
      <div class="form-controls">
      <ul class="list-checkboxes" id="food-sides">
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="fries" id="fries">
      <label class="option" for='fries'><div class="sides-title">Fries</div>
      <div class="sides-price">$2.00</div>
      </label>
      </div>
      </li>
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="soup" id="soup">
      <label class="option" for='soup'><div class="sides-title">Soup</div>
      <div class="sides-price">$2.00</div>
      </label>
      </div>
      </li>
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="salad" id="salad">
      <label class="option" for='salad'><div class="sides-title">Salad</div>
      <div class="sides-price">$1.50</div>
      </label>
      </div>
      </li>
      </ul>
      </div>
      </div>
      <div class="form-row">
      <label class="form-label">
      <span class="" style="color: rgba(14,18,25,1);font-size: 20px;">Add a drink</span>
      </label>
      <div class="form-controls">
      <ul class="list-checkboxes" id="drink-sides">
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="coke" id="coke">
      <label class="option" for="coke"><div class="sides-title">Coke</div>
      <div class="sides-price">$2.00</div>
      </label>
      </div>
      </li>
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="icetea" id="icetea">
      <label class="option" for='icetea'><div class="sides-title">Ice tea</div>
      <div class="sides-price">$2.00</div>
      </label>
      </div>
      </li>
      <li class="list-sides">
      <div class="checkbox">
      <input type="checkbox" name="sprite" id="sprite">
      <label class="option" for='sprite'><div class="sides-title">Sprite</div>
      <div class="sides-price">$2.00</div>
      </label>
      </div>
      </li>
      </ul>
      </div>
      </div>
      </form>
      </div>
      </div>
      <div class="sides-footer">
      <div class="form-actions">
      <button type="button" value="Submit" class="btn btn-dark btn-block" id="add-order">ADD TO ORDER</button>
      </div>
      <button class="btn btn-default" id="menu-item-button-cancel">CANCEL</button>
      </div>
      </div>
      </section>
      </li><!-- /.menu-item --></li>
      `;
    return markup;
  };
    //creates menu item html elements and attaches them to the correct list in the view
  const renderMenuItems = function(items) {
    //console.log(items);
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




  const loadMenu = function() {
    $.ajax({ method: 'GET', url: '/menu/' })
      .then((res) => {
        renderMenuItems(res);
        $(".menu-item-container").click((event) => {
          // ----- the element where thre currently called jQuery event handler was attached to its next sibling ----- //
          const item = $(event.delegateTarget.nextElementSibling);
          item.slideDown("slow", () => {
          });
        });
        $(".sides-container").click((event) => {
          $(event.delegateTarget).slideUp("slow", () => {
          });
        });
        $("#add-order").click((event) => {
          $(event.delegateTarget).slideUp("slow", () => {
          });
        });
      });
  };
  // calling loadTweets
  loadMenu();
});
