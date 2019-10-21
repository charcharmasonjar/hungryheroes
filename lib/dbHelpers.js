
module.exports = (db) => {

  // ~~~~~~~~~ DB HELPERS ~~~~~~~~~ //


  // ========== USERS ========== //


  // ----- get a single user from the database given their first & last name ---- //
  const getUserByName = function(first_name, last_name) {
    return db.query(`
    SELECT *
    FROM users
    WHERE first_name = $1 AND last_name = $2;
    `, [first_name, last_name])
      .then(res => {
        if (res.rows.length < 1) {
          return null;
        } else {
          return res.rows[0];
        }
      });
  };


  // ----- get a single user from db given their email ----- //
  const getUserByEmail = function(email) {
    return db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
      .then(res=> {
        if (res.rows.length < 1) {
          return null;
        } else {
          return res.rows[0];
        }
      });
  };

  // ----- get a single user from db given their phone# ----- //
  const getUserByPhone = function(phone) {
    return db.query(`
    SELECT *
    FROM users
    WHERE phone = $1;
    `, [phone])
      .then(res => {
        if (res.rows.length < 1) {
          return null;
        } else {
          return res.rows[0];
        }
      });
  };


  // ----- add a new user to the databse ----- //
  const addUser = function(user) {
    return db.query(`
    INSERT INTO users (first_name, last_name, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `, [user.first_name, user.last_name, user.email, user.password, user.phone])
      .then(res => res.rows[0]);
  };


  // ========= MENU ITEMS ========= //



  // ----- gets all menu items ---- //
  const getAllMenuItems = function() {
    return db.query(`
    SELECT *
    FROM menu_items;
    `)
      .then(res => res.rows);
  };


  // ----- get a single menu item given its title ----- //
  const getMenuItemByTitle = function(title) {
    return db.query(`
    SELECT *
    FROM menu_items
    WHERE title = $1;
    `, [title])
      .then(res => {
        if (res.rows.length < 1) {
          return null;
        } else {
          return res.rows[0];
        }
      });
  };

  // ----- get menu items by course id  ----- //
  getCourseName: function(course_id) {
    return db.query(`
    SELECT courses.name, menu_items.*
    FROM menu_items
    JOIN courses ON courses.id = course_id
    WHERE course_id = $1;
    `, [course_id])
      .then(res => res.rows[0]);
  }


  // ----- add a single menu item to the db ----- //
  const addMenuItem = function(menuItem) {
    return db.query(`
    INSERT INTO menu_items (
      title, description, image_url, price, calories, prep_time, course_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `, [menuItem.title, menuItem.description, menuItem.image_url, menuItem.price, menuItem.calories, menuItem.prep_time, menuItem.course_id])
      .then(res => res.rows[0]);
  };


  // ========= COURSES ========= //


  // -----  ----- //
  getCourseName: function(name) {
    return dbParams.query(`
    SELECT courses.name, menu_items.*
    `)
  }




  // =========== FOOD_ORDERS ============ //



  // ----- get a food order for a single user ----- //
  const getFoodOrder = function(user_id) {
    return db.query(`
    SELECT food_orders.*, users.first_name, users.last_name, users.phone
    FROM food_orders
    JOIN users ON users.id = user_id
    WHERE user_id = $1
    GROUP BY users.id, food_orders.id
    ORDER BY food_orders.created_at;
    `, [user_id])
      .then(res => res.rows);
  };

  // ----- add a food order for a single user ----- //
  const addFoodOrder = function(food) {
    return db.query(`
    INSERT INTO food_orders (
      user_id, created_at, updated_at, completed_at, comments)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `, [food.user_id, food.created_at, food.updated_at, food.completed_at, food.comments])
      .then(res => res.rows[0]);
  };

  return {
    getUserByName,
    getUserByEmail,
    getUserByPhone,
    addUser,
    getAllMenuItems,
    getMenuItemByTitle,
    addMenuItem,
    getFoodOrder,
    addFoodOrder
  };


};
