import React from 'react'
import useSearchShipment from './useSearchShipment'
import { RingLoader } from '@/components';
import { GrClose, RiSearch2Line } from '@/assets';
interface searchShipmentProps {
    navigate_to: string
}
const index = ({ navigate_to }: searchShipmentProps) => {
    const { handSearchShipment, setShipmentId, mobileSearch, setMobileSearch, shipmentId, searchLoading } = useSearchShipment(navigate_to);
    return (
        <>
            <form className="w-full hidden md:block" onSubmit={handSearchShipment}>
                <div className="flex px-3 items-center space-x-3 bg-white rounded-md border py-2 h-full">
                    <input
                        type="text"
                        value={shipmentId}
                        required
                        onChange={(e) => setShipmentId(e.target.value)}
                        placeholder="Search parcel by Shipment ID"
                        className="w-full outline-none h-full"
                    />
                    {searchLoading ? (
                        <RingLoader size={50} textColor="text-blue-900" />
                    ) : (
                        <button type="submit">
                            <RiSearch2Line />
                        </button>
                    )}
                </div>
            </form>

            <div
                className="text-blue-900 md:hidden  p-1 rounded-full text-2xl cursor-pointer"
                onClick={() => setMobileSearch(true)}
            >
                <RiSearch2Line />
            </div>

            {mobileSearch && (
                <div className="animate__animated animate__fadeInUp animate__faster  fixed z-50 h-screen bg-blue-900 bg-opacity-50 top-0 bottom-0 left-0 right-0 px-5">
                    <button
                        className="bg-white rounded-md p-2 top-3 absolute right-6 cursor-pointer"
                        onClick={() => setMobileSearch(false)}
                    >
                        <GrClose />
                    </button>
                    <div className="flex items-center justify-center  h-full">
                        <form className="w-full" onSubmit={handSearchShipment}>
                            <div className="flex px-3 items-center space-x-3 bg-white rounded-md border py-2 h-full">
                                <input
                                    type="text"
                                    value={shipmentId}
                                    required
                                    onChange={(e) => setShipmentId(e.target.value)}
                                    placeholder="Search parcel by Shipment ID"
                                    className="w-full outline-none h-full"
                                />
                                {searchLoading ? (
                                    <RingLoader size={50} textColor="text-blue-900" />
                                ) : (
                                    <button type="submit">
                                        <RiSearch2Line />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </>
    )
}

export default index
