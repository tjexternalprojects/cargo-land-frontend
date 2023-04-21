import { AppContextType, AppContext } from '@/context';
import { LocalStorageServices, UserServices } from '@/services';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useUserImage() {
	const { state, setState } = useContext<AppContextType>(AppContext);
	const userInfo = LocalStorageServices.getUserInfo();
	const [showLoader, setShowLoader] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(
		state.single_user_data?.avatar as string
	);

		useEffect(() => {
			setShowLoader(false);
			!state.single_user_data?.avatar ? setShowLoader(true) : setShowLoader(false);

			setPreviewImage(state.single_user_data?.avatar as string);
		}, [state.single_user_data?.avatar]);


	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowLoader(true);
		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				const formData = new FormData();
				formData.append('avatar', file);
				UserServices.updateUserAvatar(formData).then(
					(response) => {
						console.log(response);
						if (response.status == 202) {
							toast.success('Profile Avatar updated successfully', {
								progressClassName: 'bg-blue-500 h-1',
								autoClose: 3000,
							});
						}
						setShowLoader(false);
						const imageUrl = URL.createObjectURL(file); // Convert file to URL
						setPreviewImage(imageUrl); // Set the state variable to the URL string
					},
					(error) => {
						console.log(error);
						toast.error(error.message, {
							progressClassName: 'bg-red-500 h-1',
							autoClose: 3000,
						});
						setShowLoader(false);
					}
				);
			} else {
				toast.info('Please select an image file', {
					progressClassName: 'bg-blue-500 h-1',
					autoClose: 3000,
				});
			}
		}
	};

	return { userInfo, showLoader, previewImage, handleImageChange };
}
export default useUserImage;
