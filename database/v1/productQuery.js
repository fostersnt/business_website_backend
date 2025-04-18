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
exports.updateProductQuery = async (product, id) => {
  try {
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

    const updateData = [name, slug, description, price, discount_price, stock_quantity, sku, category_id, brand, image_url, additional_images, is_active, id];

    const query = `UPDATE products SET name=?, slug=?, description=?, price=?, discount_price=?, stock_quantity=?, sku=?, category_id=?, brand=?, image_url=?, additional_images=?, is_active=? WHERE id = ?`;

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
exports.getProductQuery = async (id) => {
    try {
      const query = `SELECT * FROM products WHERE id = ?`;
      const result = await db.query(query, id);
      // return result[0];
      return {
        isError: false,
        data: result[0],
        message: "Success"
      };
    } catch (err) {
      //LOG ERROR MESSAGE HERE
      return {
        isError: true,
        data: null,
        message: err
      };
    }
  };

  //GET PRODUCTS
exports.getProductsQuery = async () => {
  try {
    const query = "SELECT * FROM products";
    const result = await db.query(query);
    // return result[0];
    return {
      isError: false,
      data: result[0],
      message: "Success"
    };
  } catch (err) {
    //LOG ERROR MESSAGE HERE
    return {
      isError: true,
      data: null,
      message: err
    };
  }
};

  //DELETE SINGLE PRODUCT DATA
exports.deleteUserQuery = async (id) => {
    try {
      const query = "DELETE FROM products WHERE id = ?";
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

    //SEARCH PRODUCTS
exports.searchProductQuery = async (searchText) => {
  try {
    const query = "SELECT * FROM products WHERE name LIKE ?";
    const result = await db.query(query, `%${searchText}%`);
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
