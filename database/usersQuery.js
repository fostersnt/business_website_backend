const db = require("../config/db");
const bcrypt = require("bcrypt");

//INSERT USER DATA
exports.insertUser = async (userData) => {
  try {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const insertData = [userData.name, userData.email, hashedPassword];
    const result = await db.query(query, insertData);
    // return result[0];
    return {
        isError: false,
        data: result[0],
        model_name: "User"
    };
  } catch (err) {
    //LOG ERROR MESSAGE HERE
    return {
        isError: true,
        data: null,
        model_name: "User"
    };
  }
};


//UPDATE USER DATA
exports.updateUser = async (userData) => {
    try {
      const query = "UPDATE users SET name = ?, email = ?";
      const updateData = [userData.name, userData.email];
      const result = await db.query(query, updateData);
      // return result[0];
      return {
          isError: false,
          data: result[0],
          model_name: "User"
      };
    } catch (err) {
      //LOG ERROR MESSAGE HERE
      return {
          isError: true,
          data: null,
          model_name: "User"
      };
    }
  };