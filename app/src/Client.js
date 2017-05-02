/* eslint-disable no-undef */
function get(resource) {
  return fetch(`http://localhost:8000/api/${resource}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
}

function post(resource, payload) {
  return fetch(`http://localhost:8000/api/${resource}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(checkStatus)
  .then(parseJSON)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { 
  get,
  post
};
export default Client;