export const getLocalStorage = (items) => {
  return JSON.parse(localStorage.getItem(items));
}

export const setLocalStorage = (items) => {
  localStorage.setItem('notes', JSON.stringify(items));
}

export const randomId = () => {
  Math.random().toString(16).slice(2);
}
