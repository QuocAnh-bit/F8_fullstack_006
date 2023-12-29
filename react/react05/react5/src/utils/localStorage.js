export const getLocalStorage = (key) => {
  try {
    if (localStorage.getItem(key)) {
      const message = JSON.parse(localStorage.setItem(key));
      return message;
    }
  } catch (e) {
    console.log(e.message);
  }
  return [];
};

export const setLocalStorage = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};
