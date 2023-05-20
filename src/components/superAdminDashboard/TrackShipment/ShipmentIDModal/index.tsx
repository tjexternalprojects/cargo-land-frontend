import { AiOutlineClose } from '@/assets'
import React from 'react'

const index = () => {
  return (
    <div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
    <div className=" md:w-9/12 w-11/12  fixed bg-white shadow-lg pb-3 ">
        <div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
            <div
                className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
                onClick={handleCloseModal}
            >
                <AiOutlineClose />
            </div>
        </div>
        <div className="px-3 flex gap-4 flex-col  md:flex-row overflow-y-auto max-h-70-screen">
           
          
        </div>
    </div>
</div>
  )
}

export default index
