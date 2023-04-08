 const getAccessToken = () => localStorage.getItem("access_token");
 const getRefreshToken = () => localStorage.getItem("refresh_token");
const updateLocalAccessToken = (token: string) => {
    localStorage.setItem("access_token", token);
};

const setLocalRefreshToken = (token:string)=>{
    localStorage.setItem('refresh_token', token)
}

const setUserInfo = (user_info:Record<string, string>)=>{
    localStorage.setItem('user_info', JSON.stringify(user_info));
}
const TokenServices = {
    getAccessToken,
    getRefreshToken,
    updateLocalAccessToken,
    setLocalRefreshToken,
    setUserInfo
}
export default TokenServices