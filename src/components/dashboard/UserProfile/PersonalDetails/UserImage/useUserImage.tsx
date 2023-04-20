import { LocalStorageServices } from "@/services";
import { useState } from "react";
import { toast } from "react-toastify";

function useUserImage(){
	const userInfo = LocalStorageServices.getUserInfo();
    const [previewImage, setPreviewImage] = useState<string  | null>(userInfo.avatar);
    const [showLoader, setShowLoader] = useState(false)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file); // Convert file to URL
            setPreviewImage(imageUrl); // Set the state variable to the URL string
          } else {
            toast.info('Please select an image file', {
              progressClassName: 'bg-blue-500 h-1',
              autoClose: 3000,
            });
          }
        }
      };
      

    return {userInfo, showLoader, previewImage, handleImageChange}
}
export default useUserImage