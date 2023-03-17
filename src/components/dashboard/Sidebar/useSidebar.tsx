
function useSidebar(){
  const user_info = localStorage.getItem('user_info');
	const userInfo = user_info ? JSON.parse(user_info) : null;
    console.log(userInfo)
    return { userInfo };
}
export default useSidebar