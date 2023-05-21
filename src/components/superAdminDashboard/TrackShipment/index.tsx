import React from "react";
import {
  BiCurrentLocation,
  BsTelephoneForward,
  GoPackage,
  ImLocation,
  RiUserReceivedLine,
} from "@/assets";
import { MapDirection, SearchShipmentModal } from "@/components/";
import { useGeocode } from "@/components";
import useTrackShipment from "./useTrackShipment";



const TrackShipment = () => {
  const { singleShipment, showTrackingIdInput, setShowTrackingIdInput } = useTrackShipment();

  return (
    <>
      {showTrackingIdInput ? (
        <SearchShipmentModal setShowTrackingIdInput={setShowTrackingIdInput} />
      ) : (
        <>
    <div className="flex mt-8 gap-5 flex-col md:flex-row ">
      <div className=" md:w-6/12">
        <div className=" tracking-widest text-sm text-gray-500  font-bold uppercase mb-5">
          Shipment Tracking
        </div>
        <div className="flex justify-between items-center">
          <div>
            <small>Shipment ID</small>
            <div className="font-bold">{singleShipment.id}</div>
          </div>
          <label className="text-blue-700 bg-blue-100 rounded-md py-1 px-3 text-sm font-bold">
            {singleShipment.shipment_Status}
          </label>
        </div>
        <hr className="my-5" />
        <div className="ml-8 md:ml-0">
          <div className="text-sm">
            <span className="pl-6">From</span>{" "}
            <span className="text-lg font-extrabold text-red-500">(A)</span>
            <div className="text-black font-bold border-l-2 pl-6 py-10 border-slate-300  relative">
              <div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
			  <GoPackage />
              </div>

              {singleShipment.sendersAddress}
            </div>
          </div>



          <div className="text-sm">
            <span className="pl-6">Current location</span>
            <div className="text-black font-bold border-l-2 pl-6 py-10 border-slate-300 relative">
              <div className="bg-green-800 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
                <BiCurrentLocation className="text-white" />
              </div>
              {singleShipment.currentLocation}
              {singleShipment.shipment_Status === "CHECKED" ||
              singleShipment.shipment_Status === "TRANSIT" ? (
                <button className="px-2 py-1 bg-green-700 text-white rounded">
                  Update Location
                </button>
              ) : (
                <span className="text-red-500 text-lg font-bold">
                  SHIPMENT HASN'T BEEN CHECKED BY CLIENT
                </span>
              )}
            </div>
          </div>

          <div className="text-sm">
            <span className="pl-6">To</span>{" "}
            <span className="text-lg font-extrabold text-red-500">(B)</span>
            <div className="text-black font-bold  pl-6 relative">
              <div className="bg-slate-300 rounded-full p-2 text-xl inline-flex items-center justify-center absolute -left-5 -top-7">
                <ImLocation />
              </div>

              {singleShipment?.recepientAddress}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full py-5">
        <div className="flex flex-col md:flex-row    justify-between w-full gap-5">
          <div className="border-2 p-3 rounded-md flex-grow w-full">
            <div className="flex items-center text-sm space-x-2 text-slate-500">
              <RiUserReceivedLine />
              <span>Receiver</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {singleShipment?.recipient_full_name}
              </h1>
            </div>
          </div>

          <div className="border-2 p-3 rounded-md flex-grow w-full">
            <div className="flex items-center text-sm space-x-2 text-slate-500">
              <BsTelephoneForward />
              <span>Phone Number</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {singleShipment?.recipient_phone_number}
              </h1>
            </div>
          </div>

          <div className="border-2 p-3 rounded-md flex-grow w-full">
            <div className="flex items-center text-sm space-x-2 text-slate-500">
              <BiCurrentLocation />
              <span>Address</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {singleShipment?.recepientAddress}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-5 ">
          <MapDirection
            height="80vh"
            startLocation={{
              lng: parseFloat(singleShipment?.current_location?.longitude),
              lat: parseFloat(singleShipment?.current_location?.latitude),
            }}
            endLocation={{
              lng: parseFloat(singleShipment?.shipment_destination?.longitude),
              lat: parseFloat(singleShipment?.shipment_destination?.latitude),
            }}
          />
        </div>
      </div>
    </div>
    </>
      )}
    </>
  );
};

export default TrackShipment;
