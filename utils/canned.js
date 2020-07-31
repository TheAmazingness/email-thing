const canned = () =>
  !!localStorage.getItem('canned') && !!JSON.parse(localStorage.getItem('canned')).length;

export default canned;