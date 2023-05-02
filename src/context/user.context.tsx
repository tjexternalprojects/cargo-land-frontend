function UserContext() {
	const single_user_data = null;
	const all_users: Record<string, string>[] = [];
	const userCurrentTab = 'item1';
	const updateUser = false;
	return { single_user_data, userCurrentTab, updateUser, all_users };
}
export default UserContext;
