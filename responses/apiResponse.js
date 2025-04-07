//INSERT RESPONSE
exports.insertResponse = (isError, data, message) => {
  return {
    isError: isError,
    data: data,
    message: message,
  };
};

//UPDATE RESPONSE
exports.updateResponse = (isError, data, message) => {
  return {
    isError: isError,
    data: data,
    message: message,
  };
};

//GET RESPONSE
exports.getResponse = (isError, data, message) => {
    return {
      isError: isError,
      data: data,
      message: message,
    };
  };

//DELETE RESPONSE
exports.deleteResponse = (isError, message) => {
  return {
    isError: isError,
    message: message,
  };
};
