let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports =  {
  dbParams,

  // ~~~~~~~~~ DB HELPERS ~~~~~~~~~ //


  // ========== USERS ========== //


  // ----- get a single user from the database given their first & last name ---- //
  getUserByFirstName: function(first_name, last_name) {
    return dbParams.query(`
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
  },


  // ----- get a single user from db given their email ----- //
  getUserByEmail: function(email) {
    return dbParams.query(`
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
  },

  // ----- get a single user from db given their phone# ----- //
  getUserByPhone: function(phone) {
    return dbParams.query(`
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
  },


  // ----- add a new user to the databse ----- //
  addUser: function(user) {
    return dbParams.query(`
    INSERT INTO users (first_name, last_name, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `, [user.first_name, user.last_name, user.email, user.password, user.phone])
      .then(res => res.rows[0]);
  },


  // ========= MENU ITEMS ========= //



  // ----- gets all menu items ---- //
  getAllMenuItems: function() {
    return dbParams.query(`
    SELECT *
    FROM menu_items;
    `)
      .then(res => res.rows);
  },


  // ----- get a single menu item given its title ----- //
  getMenuItemByTitle: function(title) {
    return dbParams.query(`
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
  },


  // ----- add a single menu item to the db ----- //
  addMenuItem: function(menuItem) {
    return dbParams.query(`
    INSERT INTO menu_items (
      title, description, image_url, price, calories, prep_time, course_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `, [menuItem.title, menuItem.description, menuItem.image_url, menuItem.price, menuItem.calories, menuItem.prep_time, menuItem.course_id])
      .then(res => res.rows[0]);
  },


  // ========= COURSES ========= //


  // ----- get course name for menu item ----- //
  // getCourseName: function(name) {
  //   return dbParams.query(`
  //   SELECT courses.name, menu_items.
  //   `)
  // }




  // =========== FOOD_ORDERS ============ //



  // ----- get a food order for a single user ----- //
  getFoodOrder: function(user_id) {
    return dbParams.query(`
    SELECT food_orders.*, users.first_name, users.last_name, users.phone
    FROM food_orders
    JOIN users ON users.id = user_id
    WHERE user_id = $1
    GROUP BY users.id, food_orders.id
    ORDER BY food_orders.created_at;
    `, [user_id])
      .then(res => res.rows);
  },

  // ----- add a food order for a single user ----- //
  addFoodOrder: function(food) {
    return dbParams.query(`
    INSERT INTO food_orders (
      user_id, created_at, updated_at, completed_at, comments)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `, [food.user_id, food.created_at, food.updated_at, food.completed_at, food.comments])
      .then(res => res.rows[0]);
  }



}
