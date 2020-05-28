// const fetch = window.fetch;
//
// window.fetch = null;
// window.XMLHttpRequest = null;

export const direct = (url, query = {}) => {
  let stringify = '';
  Object.keys(query).forEach(key => stringify += !/[;,/?:@&=+$#]/g.test(key) ? `&${ key }=${ encodeURIComponent(query[key]) }` : null);
  stringify = stringify.replace('&', '?');
  window.location.assign(url + stringify);
};

export const get = (url, query = {}) => {
  let stringify = '';
  Object.keys(query).forEach(key => stringify += !/[;,/?:@&=+$#]/g.test(key) ? `&${ key }=${ encodeURIComponent(query[key]) }` : null);
  stringify = stringify.replace('&', '?');
  return fetch(url + stringify, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Connection: 'keep-alive'
    },
    credentials: 'include'
  });
};

export const post = (url, body = {}) => {
  let stringify = '';
  Object.keys(body).forEach(key => stringify += `&${ key }=${ body[key] }`);
  stringify = stringify.replace('&', '?');
  return fetch(`${ url }${ stringify }`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      Connection: 'keep-alive'
    },
    credentials: 'include'
  });
};