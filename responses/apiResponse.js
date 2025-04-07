//INSERT RESPONSE
exports.insertResponse = (isError, data, model_name) => {
  return {
    isError: isError,
    data: data,
    message: `${model_name} has been created successfully`,
  };
};

//UPDATE RESPONSE
exports.updateResponse = (isError, data, model_name) => {
  return {
    isError: isError,
    data: data,
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
