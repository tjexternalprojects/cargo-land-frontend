import { useApp } from '@/context';
function useSidebar(){
	const { user } = useApp();
    const userInfo = user.user_info ? JSON.parse(user.user_info) : null;
    console.log(userInfo)
    return {userInfo}
}
export default useSidebar