/* eslint-disable linebreak-style */
const requests = [];

function createResetRequest(resetRequest) {
  requests.push(resetRequest);
  console.log(requests);
}

function getResetRequest(id) {
  const thisRequest = requests.find(req => req.id === id);
  return thisRequest;
}

module.exports = {
  createResetRequest,
  getResetRequest,
};
