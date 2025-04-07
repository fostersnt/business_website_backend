exports.insertResponse = (isError, itemId, model_name) => {
  return {
    isError: isError,
    [`${model_name}Id`]: itemId,
    message: `${model_name} has been created successfully`,
  };
};
