//INSERT RESPONSE
exports.insertResponse = (isError, itemId, model_name) => {
  return {
    isError: isError,
    [`${model_name}Id`]: itemId,
    message: `${model_name} has been created successfully`,
  };
};

//UPDATE RESPONSE
exports.updateResponse = (isError, itemId, model_name) => {
  return {
    isError: isError,
    [`${model_name}Id`]: itemId,
    message: `${model_name} has been updated successfully`,
  };
};

//GET RESPONSE
exports.getResponse = (isError, data) => {
    return {
      isError: isError,
      data: data,
      message: "Success",
    };
  };

//DELETE RESPONSE
exports.deleteResponse = (isError, itemId, model_name) => {
  return {
    isError: isError,
    [`${model_name}Id`]: itemId,
    message: `${model_name} has been deleted successfully`,
  };
};
