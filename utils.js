export const getLocalStorage = (items) => {
  return JSON.parse(localStorage.getItem(items));
}

export const setLocalStorage = (items) => {
  localStorage.setItem('notes', JSON.stringify(items));
}

export const getCallback = (callbackName) => {
  if (callbackName && typeof window[callbackName] === 'function')
    return window[callbackName];
  else
    console.error(`No callback defined for ${callbackName}`);
}

export const randomId = () => {
  return Math.random().toString(16).slice(2);
}
