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
const {
  insertProductQuery,
  updateProductQuery,
  getProductQuery,
  searchProductQuery,
  getProductsQuery,
} = require("../../database/v1/productQuery");

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
      const insertedId = result.data["insertId"];
      const insertedProduct = await getProductQuery(insertedId);
      res
        .status(createdCode)
        .json(
          insertResponse(
            result.isError,
            insertedProduct.data[0],
            result.message
          )
        );
    } else {
      res
        .status(badRequestCode)
        .json(
          insertResponse(result.isError, result.data, result.message["message"])
        );
    }
  } catch (err) {
    res.status(serverErrorCode).json(insertResponse(true, null, err));
  }
};

exports.getProducts = async (req, res) => {
  try {
    const result = await getProductsQuery();
    if (result.isError === false && result.data.length > 0) {
      res.status(successCode).json(getResponse(result.isError, result.data, "Fetch success"));
    } else {
      res.status(successCode).json(getResponse(true, result.data, "No products found"));
    }
  } catch (err) {
    res.status(successCode).json(getResponse(true, null, "Error occurred while fetching products"));
  }
};

exports.getProduct = async (req, res) => {
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

exports.updateProduct = async (req, res) => {
  try {
    // if (req.body == null) {
    //   return res.status(badRequestCode).json({
    //     isError: true,
    //     errorMessage: "Request body is missing",
    //   });
    // }

    const id = req.params.id;

    const product = req.body;

    const result = await updateProductQuery(product, id);

    if (result.isError === false && result.data["affectedRows"] > 0) {
      //GET UPDATED PRODUCT
      const updatedProduct = await getProductQuery(id);
      res
        .status(successCode)
        .json(
          updateResponse(
            result.isError,
            updatedProduct.data[0],
            `Product with id: ${id} is updated successfully`
          )
        );
    } else {
      res
        .status(badRequestCode)
        .json(
          updateResponse(
            result.isError,
            result.data,
            `Unable to update product with id: ${id}`
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

exports.searchProduct = async (req, res) => {
  try {
    const searchText = req.query.product_name;
    const result = await searchProductQuery(searchText);
    if (result.isError === false) {
      res.json(getResponse(result.isError, result.data, "Success"));
    } else {
      res.json(
        getResponse(result.isError, result.data, "No search data found")
      );
    }
  } catch (err) {
    res.json(getResponse(true, null, err));
  }
};
