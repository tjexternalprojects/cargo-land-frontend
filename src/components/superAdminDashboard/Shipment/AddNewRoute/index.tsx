import {
	AiOutlineClose,
	MdAddLocationAlt,
	MdOutlineMyLocation,
	MdOutlineShareLocation,
	RiSearch2Line,
} from '@/assets';
import React from 'react';
import useAddNewRoute from './useAddNewRoute';
import { Country, State, City } from 'country-state-city';
import { AddressMap, RingLoader } from '@/components';

interface ShipmentLocationProps {
	setShowUpdateShipmentLocation: React.Dispatch<React.SetStateAction<boolean>>;
	setSingleShipment: any;
	singleShipmentId: string;
}

const index = ({
	setShowUpdateShipmentLocation,
	setSingleShipment,
	singleShipmentId,
}: ShipmentLocationProps) => {
	const {
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		getShipmentLocation,
		handleSetCurrentLocation,
		shipmentCurrentLocation,
		showLoader,
		address,
		stateCity,
		countryState,
		country,
	} = useAddNewRoute(singleShipmentId, setSingleShipment, setShowUpdateShipmentLocation);
	return (
		<div className=" fixed h-full  w-full top-0 left-0  z-30 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" w-11/12  md:w-1/2  fixed bg-white shadow-lg pb-3 ">
				<div className="flex  w-full justify-between px-3 py-2 text-white  bg-blue-900  ">
					<div>
						<span className="font-bold">Add New Route Location</span>
					</div>
					<div
						onClick={() => setShowUpdateShipmentLocation(false)}
						className="rounded-full shadow-lg hover:shadow-blue-200 hover:bg-white hover:text-blue-900 transition-all duration-75 ease-in-out cursor-pointer p-2 "
					>
						<AiOutlineClose />
					</div>
				</div>
				<div className="px-3 gap-4 flex-col ">
					<div className=" p-4 bg-white">
						<label className="text-lg text-gray-400">Shipment New Location</label>

						{/* COUNTRY */}
						<form onSubmit={getShipmentLocation}>
							<div className="flex flex-col space-y-5 mt-3">
								<div>
									<small className="text-gray-400 font-bold">
										Country
										<span className="text-red-500"> * </span>
									</small>
									<div className=" flex  border-b-2 mt-2 p-2">
										<select
											className="w-full bg-white outline-none"
											value={JSON.stringify(country)}
											onChange={(e) => handleChangeCountry(JSON.parse(e.target.value))}
											required
										>
											<option value={0}>Select Country</option>
											{Country.getAllCountries().map((country) => (
												<option
													key={country?.isoCode}
													value={JSON.stringify(country)}
													className="space-x-10"
												>
													{country.name}
												</option>
											))}
										</select>
										<div className="text-xl text-gray-500">
											{Country.getCountryByCode(country?.isoCode)?.flag}
										</div>
									</div>
								</div>

								{/* STATE */}
								<div>
									<small className="text-gray-400 font-bold">
										State
										<span className="text-red-500"> * </span>
									</small>
									<div className=" flex  border-b-2 mt-2 p-2">
										<select
											className="w-full bg-white outline-none"
											value={JSON.stringify(countryState)}
											onChange={(e) => handleChangeState(JSON.parse(e.target.value))}
											disabled={Object.keys(country).length === 0}
											required
										>
											<option value={0}>Select State</option>

											{State.getStatesOfCountry(country?.isoCode).map((states) => (
												<option value={JSON.stringify(states)} key={states?.isoCode}>
													{states?.name}
												</option>
											))}
										</select>
										<div className="text-xl text-gray-500">
											<MdOutlineShareLocation />
										</div>
									</div>
								</div>

								{/* CITY */}
								<div>
									<small className="text-gray-400 font-bold">
										City
										<span className="text-red-500"> * </span>
									</small>
									<div className=" flex  border-b-2 mt-2 p-2">
										<select
											disabled={Object.keys(countryState).length === 0}
											className="w-full bg-white outline-none"
											value={JSON.stringify(stateCity)}
											onChange={(e) => handleChangeCity(JSON.parse(e.target.value))}
											required
										>
											<option value={0}>Select City</option>

											{City.getCitiesOfState(country?.isoCode, countryState?.isoCode).map(
												(cities, key) => (
													<option value={JSON.stringify(cities)} key={key}>
														{cities?.name}
													</option>
												)
											)}
										</select>
										<div className="text-xl text-gray-500">
											<MdOutlineMyLocation />
										</div>
									</div>
								</div>
								<div className="mt-3">
									<small className=" text-gray-400 font-bold">
										Address
										<span className="text-red-500"> * </span>
									</small>
									<div className=" flex  border-b-2 mt-2 p-2">
										<div className="text-xl text-gray-500">
											<RiSearch2Line />
										</div>
										<input
											type="text"
											className="w-full outline-none px-2 bg-white"
											value={address ?? ''}
											placeholder="type in shipment street address location"
											onChange={(e) => handleChangeAddress(e.target.value)}
											disabled={Object.keys(stateCity).length === 0}
											required
										/>
										<div className="text-xl text-gray-500">
											<MdAddLocationAlt />
										</div>
									</div>
								</div>
							</div>

							{shipmentCurrentLocation.formattedAddress && (
								<>
									<AddressMap
										formatted_address={shipmentCurrentLocation.formattedAddress as string}
										geoLocation={{
											lng: Number(shipmentCurrentLocation?.longitude),
											lat: Number(shipmentCurrentLocation?.latitude),
										}}
										height="10vh"
									/>
									<div className=" font-extrabold text-xl text-red-500">
										<span className="underline">Address Found: </span>
										{shipmentCurrentLocation.formattedAddress}
									</div>
								</>
							)}

							<div className="mt-4">
								{!shipmentCurrentLocation.formattedAddress ? (
									<button
										disabled={showLoader}
										type="submit"
										className="hover:shadow-md items-center justify-center shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
									>
										{!showLoader ? (
											<div>Validate Address</div>
										) : (
											<RingLoader size={20} loaderColor="white" />
										)}
									</button>
								) : (
									<button
										type="button"
										onClick={handleSetCurrentLocation}
										className=" flex items-center justify-center hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md"
									>
										{!showLoader ? (
											<div>Add This Location</div>
										) : (
											<RingLoader size={20} loaderColor="white" />
										)}
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;
