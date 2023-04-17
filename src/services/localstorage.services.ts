const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const getUserInfo = () => localStorage.getItem("user_info");
const getDefaultValue = () => localStorage.getItem('default_values')

const setLocalAccessToken = (token: string) => localStorage.setItem("access_token", token);
const setLocalRefreshToken = (token: string) =>localStorage.setItem("refresh_token", token);
const setUserInfo = (user_info: Record<string, string>) =>localStorage.setItem("user_info", JSON.stringify(user_info));
const setDefaultValue = (status: boolean) =>localStorage.setItem("default_values", JSON.stringify(status));

const LocalStorageServices = {
  getAccessToken,
  getRefreshToken,
  getUserInfo,
  getDefaultValue,
  
  setLocalAccessToken,
  setLocalRefreshToken,
  setUserInfo,
  setDefaultValue,
};
export default LocalStorageServices;
