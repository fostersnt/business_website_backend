const db = require("../../config/db");
const bcrypt = require("bcrypt");

//INSERT USER DATA
exports.insertProductQuery = async (product) => {
  try {
    const query = "INSERT products (name, slug, description, price, discount_price, stock_quantity, sku, category_id, brand, image_url, additional_images, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const name = product.name;
    const slug = product.slug;
    const description = product.description;
    const price = product.price;
    const discount_price = product.discount_price;
    const stock_quantity = product.stock_quantity;
    const sku = product.sku;
    const category_id = product.category_id;
    const brand = product.brand;
    const image_url = product.image_url;
    const additional_images = JSON.stringify(product.additional_images);
    const is_active = product.is_active;

    const insertData = [name, slug, description, price, discount_price, stock_quantity, sku, category_id, brand, image_url, additional_images, is_active];

    const result = await db.query(query, insertData);
    // return result[0];
    return {
      isError: false,
      data: result[0],
      message: "Product created successfully",
    };
  } catch (err) {
    //LOG ERROR MESSAGE HERE
    return {
      isError: true,
      data: null,
      message: err,
    };
  }
};

//UPDATE USER DATA
exports.updateUserQuery = async (userData) => {
  try {
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    const updateData = [userData.name, userData.email, userData.id];
    const result = await db.query(query, updateData);
    // return result[0];
    return {
      isError: false,
      data: result[0],
    };
  } catch (err) {
    //LOG ERROR MESSAGE HERE
    return {
      isError: true,
      data: null,
    };
  }
};


//GET SINGLE USER DATA
exports.getUserQuery = async (id) => {
    try {
      const query = `SELECT id, name, email FROM users WHERE id = ?`;
      const result = await db.query(query, id);
      // return result[0];
      return {
        isError: false,
        data: result[0],
      };
    } catch (err) {
      //LOG ERROR MESSAGE HERE
      return {
        isError: true,
        data: null,
      };
    }
  };

  //DELETE SINGLE USER DATA
exports.deleteUserQuery = async (id) => {
    try {
      const query = `DELETE FROM products WHERE id = ?`;
      const result = await db.query(query, id);
      // return result[0];
      return {
        isError: false,
        data: result[0],
      };
    } catch (err) {
      //LOG ERROR MESSAGE HERE
      return {
        isError: true,
        data: null,
      };
    }
  };
