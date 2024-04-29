const apiPath = '/api/v1';

const routes = {
  createNewUser: () => `${apiPath}/signup`,
  login: () => `${apiPath}/login`,
  channelsPath: () => `${apiPath}/channels`,
  messagesPath: () => `${apiPath}/messages`,
  root: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
};

export default routes;
