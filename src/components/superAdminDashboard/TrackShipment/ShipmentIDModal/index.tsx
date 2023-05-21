import { AiOutlineClose } from '@/assets'
import React from 'react'
import useShipmentIDModal from './useShipmentIDModal'
const index = () => {
    const { handleCloseModal } = useShipmentIDModal()
    return (
        <div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
            <div className=" md:w-9/12 w-11/12  fixed bg-slate-300 shadow-lg pb-3 ">
                <div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
                    <span>Search Shipment</span>
                    <div
                        className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
                        onClick={handleCloseModal}
                    >
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="px-3 gap-4 flex-col py-3  md:flex-row overflow-y-auto max-h-70-screen">
                    <form className='flex w-full '>
                        <input
                            type="text"
                            className="w-full outline-none px-2 bg-white"
                            placeholder="Enter Shipment Tracking ID"
                            required
                        />
                        <button
								type="submit"
								className="hover:shadow-md  shadow-gray-50 shadow-sm  p-2 rounded-sm bg-blue-700 font-bold text-white text-md"
							>
								Search
							</button>
                    </form>
                    <button
								type="submit"
								className="hover:shadow-md mt-3 shadow-gray-50 shadow-sm  p-2 rounded-sm bg-blue-700 font-bold text-white text-md"
							>
								View All Shipment
							</button>
                </div>
            </div>
        </div>
    )
}

export default index
