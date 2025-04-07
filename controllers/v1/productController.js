const db = require("../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { isError } = require("joi");
const {
  insertUserQuery,
  updateUserQuery,
  getUserQuery,
  deleteUserQuery,
} = require("../../database/v1/usersQuery");
const {
  insertResponse,
  updateResponse,
  getResponse,
  deleteResponse,
} = require("../../responses/v1/apiResponse");
const {
  badRequestCode,
  successCode,
  serverErrorCode,
  notFoundCode,
  unauthorizedCode,
  createdCode,
} = require("../../responses/v1/apiStatus");
const { insertProductQuery } = require("../../database/v1/productQuery");

exports.create = async (req, res) => {
  try {
    // if (req.body == null) {
    //   return res.status(badRequestCode).json({
    //     isError: true,
    //     errorMessage: "Request body is missing",
    //   });
    // }
    const productData = req.body;

    const result = await insertProductQuery(productData);

    if (result.isError === false && result.data["affectedRows"] > 0) {
      res
        .status(createdCode)
        .json(
          insertResponse(
            result.isError,
            result.data["insertId"],
            result.message
          )
        );
    } else {
      res
        .status(badRequestCode)
        .json(
          insertResponse(
            result.isError,
            result.data,
            result.message['message']
          )
        );
    }
  } catch (err) {
    res.status(serverErrorCode).json(insertResponse(true, null, 'err'));
  }
};

exports.getUsers = async (req, res) => {
  const [rows] = await db.query("SELECT id, name, email FROM users");
  res.json(rows);
};

exports.getUser = async (req, res) => {
  try {
    if (!req.params) {
      return res.json(getResponse(true, null, "User id missing"));
    }

    const { id } = req.params;

    const result = await getUserQuery(id);
    if (result.isError === false && result.data.length > 0) {
      return res
        .status(successCode)
        .json(getResponse(result.isError, result.data[0], "User found"));
    } else {
      return res
        .status(notFoundCode)
        .json(getResponse(true, null, "Failed, user not found"));
    }
  } catch (err) {
    return res
      .status(notFoundCode)
      .json(getResponse(true, null, "Unable to retrieve user data"));
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body == null) {
      return res.status(badRequestCode).json({
        isError: true,
        errorMessage: "Request body is missing",
      });
    }

    const id = req.params.id;
    const { name, email } = req.body;

    const userData = {
      id: id,
      name: name,
      email: email,
    };

    const result = await updateUserQuery(userData);

    if (result.isError === false && result.data["affectedRows"] > 0) {
      res
        .status(successCode)
        .json(
          updateResponse(
            result.isError,
            result.data,
            `User with id: ${id} is updated successfully`
          )
        );
    } else {
      res
        .status(badRequestCode)
        .json(
          updateResponse(
            result.isError,
            result.data,
            `Unable to update user with id: ${id}`
          )
        );
    }
  } catch (err) {
    res.status(serverErrorCode).json(updateResponse(result.isError, null, err));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res
        .status(badRequestCode)
        .json(deleteResponse(true, "User id missing"));
    }
    const { id } = req.params;
    const result = await deleteUserQuery(id);
    if (result.isError === false && result.data["affectedRows"] > 0) {
      return res
        .status(successCode)
        .json(
          deleteResponse(
            result.isError,
            `User with id: ${id} is deleted successfully`
          )
        );
    } else {
      return res
        .status(successCode)
        .json(
          deleteResponse(
            result.isError,
            `Unable to deleted user with id: ${id}`
          )
        );
    }
  } catch (err) {
    return res
      .status(serverErrorCode)
      .json(deleteResponse(true, "Error occurred while deleting user data"));
  }
};
