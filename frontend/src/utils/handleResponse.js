const handleResponse = (error, response, cb) => {
  if (error) {
    const err = { status: 'Network error' };
    cb(err);
  } else {
    cb(response);
  }
};
export default handleResponse;
