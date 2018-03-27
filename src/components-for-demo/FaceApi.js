const faceApiBaseUrl='https://westcentralus.api.cognitive.microsoft.com';

const headers ={
  'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '5e3e44e45050468095fc0c46615e905c',
}

const createFetch = (path, params) => {
    return fetch(`${faceApiBaseUrl}${path}`, params);
};

const createMethodHandler = (method) => {
    return (path, body) => createFetch(path, {
        method,
        headers,
        body: method !== 'GET' && body,
    });
};  

export default {
    get: createMethodHandler('GET'),
    put: createMethodHandler('PUT'),
    post: createMethodHandler('POST'),
    del: createMethodHandler('DELETE'),
};
