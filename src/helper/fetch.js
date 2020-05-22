const fetch = window.fetch;

window.fetch = null;
window.XMLHttpRequest = null;

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
  return fetch(url + stringify);
};

export const post = (url, body = {}) => {
  let stringify = '';
  Object.keys(body).forEach(key => stringify += `&${ key }=${ body[key] }`);
  stringify.substring(0, 1);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    credentials: 'include',
    body: stringify
  });
};