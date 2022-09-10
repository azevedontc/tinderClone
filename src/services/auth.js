export const isAuthenticated = () => {
  return Boolean(window.localStorage.getItem("token"));
};
