const buddyList = () =>
  !!localStorage.getItem('buddyList') && !!JSON.parse(localStorage.getItem('buddyList')).length;

export default buddyList;