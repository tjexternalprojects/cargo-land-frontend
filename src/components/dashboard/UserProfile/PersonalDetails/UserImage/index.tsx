import React from 'react'
import useUserImage from './useUserImage'
import { BiCloudUpload, userImg } from '@/assets'
import { RingLoader } from '@/components'

const index = () => {
    const { userInfo, showLoader, previewImage, handleImageChange } = useUserImage()
    return (
        <div className="animate__animated animate__fadeInUp   bg-white md:w-9/12 w-full  md:px-0  p-4 shadow-sm rounded-sm flex flex-wrap md:flex-nowrap items-center justify-center gap-4 mb-3 ">

            <div className=" w-28 h-28 max-h-28 max-w-md rounded-full shadow-md border border-slate-200">
                <img
                    src={previewImage ? previewImage : userImg}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>


            <div className="  h-10  bg-blue-700 text-white shadow inline-flex items-center pl-5 overflow-hidden">
                <label className="  h-20 flex items-center justify-between space-x-3  cursor-pointer">
                    <span className='text-sm md:text-md'>Update Image</span>
                    <div className="w-20 h-20  rounded-l-full bg-blue-900  flex items-center justify-center">
                        {!showLoader ? <BiCloudUpload className="text-3xl text-white" /> :
                            <RingLoader size={50} loaderColor="#fff" />}

                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>
                </label>
            </div>
        </div>
    )
}

export default index
