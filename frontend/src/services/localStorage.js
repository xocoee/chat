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

// class Storage {
//   getUserData() {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       return JSON.parse(userData);
//     }
//     return null;
//   }

//   setUserData(userData) {
//     if (!userData) return;
//     localStorage.setItem('user', JSON.stringify(userData));
//   }

//   removeUserData() {
//     localStorage.removeItem('user');
//   }
// }

// const storage = new Storage();

// export default storage;
