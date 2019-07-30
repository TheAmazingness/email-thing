const font = () => JSON.parse(localStorage.getItem('font')) ? 'large' : '';

export default font;