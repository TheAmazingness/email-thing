const font = () => {
  return JSON.parse(localStorage.getItem('font')) ? 'large' : '';
};

export default font;