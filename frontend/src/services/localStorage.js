function getUserData() {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

function setUserData(userData) {
  if (!userData) return;
  localStorage.setItem('user', JSON.stringify(userData));
}

function removeUserData() {
  localStorage.removeItem('user');
}

const storage = {
  getUserData,
  setUserData,
  removeUserData,
};

export default storage;
