import storage from '../services/localStorage';

export const getAuthConfig = () => {
  const userData = storage.getUserData();

  return {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };
};

export const getIsAuthorized = () => {
  const userData = storage.getUserData();
  return userData && userData?.token;
};

export const getUserData = () => {
  const userData = storage.getUserData();
  return userData?.username;
};

export const removeUserData = () => {
  storage.removeUserData();
};
