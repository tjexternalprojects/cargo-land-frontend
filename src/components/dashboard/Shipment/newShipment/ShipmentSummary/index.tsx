import { FC } from "react";
import {
  AiOutlineClose,
  AiOutlineEdit,
  BsCartCheck,
  MdTrackChanges,
  MdViewInAr,
  package1,
  RiUserReceivedLine,
  userImg,
} from "@/assets";
import { ToastContainer } from "react-toastify";
import Slider from "react-slick";

import useShipmentSummary from "./useShipmentSummary";
import { RingLoader, ShipmentModal } from "@/components";

const RecipientDetails = () => {
  const {
    image_slider_settings,
    showShipmentModal,
    unCheckedShipment,
    totalPrice,
    removeShipmentLoader,
    minusAmount,
    handleAddShipment,
    handleRemoveItem,
    handleShowModal,
    handlePayment,
    handleSummary,
    setShowShipmentModal,
  } = useShipmentSummary();
  return (
    <>
      <div className="inline-flex flex-col  w-full  md:ml-40 ">
        <div className="flex gap-5 px-3">
          <div className="bg-white  rounded-sm shadow-md  box-border w-full">
            <div className=" h-screen-55 rounded-md overflow-auto w-full p-3 ">
              <table className=" w-full  bg-white rounded-sm">
                <thead className=" text-left  w-full bg-slate-100 ">
                  <tr>
                    <th></th>
                    <th className="p-3">Shipment Id</th>
                    <th>Current Location</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <td></td>
                  </tr>
                </thead>
                <tbody className=" overflow-y-auto">
                  {unCheckedShipment?.map((val: any, index: number) => (
                    <tr
                      key={index}
                      className=" border-b hover:bg-slate-300  text-sm"
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked
                          onChange={() => minusAmount(val.delivery_price)}
                        />
                      </td>
                      <td
                        className="p-3 underline cursor-pointer text-blue-800"
                        onClick={handleShowModal}
                      >
                        {val.id}
                      </td>
                      <td className="p-3 w-1/4">{val.sendersAddress}</td>
                      <td className="p-3 w-1/4">{val.recepientAddress}</td>
                      <td className="p-3">
                        {val.delivery_price.toLocaleString()}
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveItem(val.id)}
                          className="bg-red-500 rounded-full flex-grow md:flex-grow-0 w-full justify-between text-white flex space-x-2 items-center shadow-md"
                        >
                          <span className=" px-3 py-1">Remove</span>
                          {removeShipmentLoader ? (
                            <RingLoader size={50} textColor="text-blue-900" />
                          ) : (
                            <div className="rounded-full h-8 w-8 object-contain flex items-center justify-center bg-red-700">
                              <AiOutlineClose />
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className=" bottom-5 w-full  ">
              <div className="bg-slate-100 p-5">
                <div>Total Packages: {unCheckedShipment.length}</div>
                <div>
                  Total Amount:{" "}
                  <span>&#8358;{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between p-5 gap-4 flex-wrap md:flex-nowrap">
                <button
                  onClick={handlePayment}
                  className="flex md:flex-grow-0 flex-grow items-center bg-red-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
                >
                  <div className="p-2">Checkout</div>
                  <div
                    className="bg-red-900 rounded-l-full h-full w-10  flex items-center justify-center
									"
                  >
                    <BsCartCheck />
                  </div>
                </button>

                <button
                  onClick={handleAddShipment}
                  className="flex md:flex-grow-0 flex-grow items-center bg-blue-700 justify-between  space-x-3 text-white  hover:transition-all duration-150 ease-in-out hover:shadow-md hover:shadow-blue-100  shadow-md shadow-slate-300"
                >
                  <div className="p-2">Add More Shipment</div>
                  <div
                    className="bg-blue-900 rounded-l-full h-full w-10  flex items-center justify-center
									"
                  >
                    +
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showShipmentModal && (
        <ShipmentModal setShowModal={setShowShipmentModal} />
      )}
    </>
  );
};

export default RecipientDetails;
