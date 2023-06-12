import { FC, useEffect, useState } from 'react';
import {
	BsTelephoneForward,
	FaUserEdit,
	MdAddLocationAlt,
	MdAttachEmail,
	MdOutlineMyLocation,
	MdOutlineShareLocation,
	RiSearch2Line,
	RiUserReceivedLine,
} from '@/assets';
import { AddressMap, RingLoader } from '@/components';
import { Country, State, City } from 'country-state-city';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { useForm } from 'react-hook-form';

import useRecipientDetails from './useRecipientDetails';

const RecipientDetails = () => {
	const {
		handleRecipientDetails,
		setShipmentDetails,
		moveNext,
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		handleUpdateShipment,
		handleChangeAirport,
		airportList,
		airport,
		state,
		stateCity,
		address,
		countryState,
		showLoader,
		country,
		shipmentDetails,
	} = useRecipientDetails();
	const { control, handleSubmit } = useForm();
	const [value, setValue] = useState('');
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<RiUserReceivedLine />
				</div>
				<p className="text-xl mt-4">Recipient Details</p>

				<form className=" w-9/12 my-5" onSubmit={handleSubmit(handleRecipientDetails)}>
					<div className="bg-white p-4 shadow-sm rounded-sm">
						<label className="text-sm text-gray-400">
							Recipient Full Name <span className="text-red-500"> * </span>{' '}
						</label>
						<div className=" border-b-2 flex  mt-2 p-2 bg-white">
							<input
								className="w-full outline-none"
								type="text"
								value={(shipmentDetails.recipient_full_name as string) ?? ''}
								onChange={(e) =>
									setShipmentDetails({
										...shipmentDetails,
										recipient_full_name: e.target.value,
									})
								}
								required
							/>
							<div className="text-xl text-gray-500">
								<FaUserEdit />
							</div>
						</div>

						<div className="mt-3">
							<label className="text-sm text-gray-400">
								Recipient Email <span className="text-red-500"> * </span>
							</label>
							<div className=" border-b-2 flex  mt-2 p-2 bg-white">
								<input
									className="w-full outline-none"
									type="email"
									value={(shipmentDetails.recipient_email as string) ?? ''}
									onChange={(e) =>
										setShipmentDetails({
											...shipmentDetails,
											recipient_email: e.target.value,
										})
									}
									required
								/>
								<div className="text-xl text-gray-500">
									<MdAttachEmail />
								</div>
							</div>
						</div>

						<div className="mt-3">
							<label className="text-sm text-gray-400">
								Recipient Phone Number <span className="text-red-500"> * </span>
							</label>
							<div className=" border-b-2 flex w-full  mt-2">
								{/* {shipmentDetails.recipient_phone_number !== '' && state.editShipment == true && ( */}
								{shipmentDetails.recipient_phone_number !== '' && state.editShipment === true && (
									<PhoneInputWithCountry
										name="phoneInputWithCountrySelect"
										control={control}
										rules={{ required: true }}
										placeholder="Enter phone number"
										className=" outline-none focus:outline-none border-none"
										defaultValue={shipmentDetails.recipient_phone_number}
										value={shipmentDetails.recipient_phone_number || ''}
										onChange={(e: string) =>
											setShipmentDetails({
												...shipmentDetails,
												recipient_phone_number: e,
											})
										}
									/>
								)}

								{state.editShipment === false && (
									<PhoneInputWithCountry
										name="phoneInputWithCountrySelect2"
										control={control}
										rules={{ required: true }}
										placeholder="Enter phone number"
										className=" outline-none focus:outline-none border-none"
										value={shipmentDetails.recipient_phone_number || ''}
										onChange={(e: string) =>
											setShipmentDetails({
												...shipmentDetails,
												recipient_phone_number: e,
											})
										}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="bg-white p-4 shadow-sm rounded-sm mt-10">
						<label className="text-lg text-gray-400">Shipment Destination Address</label>
						<div className="flex flex-col space-y-5 mt-3">
							<div>
								<small className="text-gray-400 font-bold">
									Country <span className="text-red-500"> * </span>
								</small>
								<div className=" border-b-2 flex  mt-2 p-2 bg-white">
									<select
										className="w-full outline-none"
										value={JSON.stringify(country)}
										onChange={(e) => handleChangeCountry(JSON.parse(e.target.value))}
										required
									>
										<option value="0">Select Country</option>
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

							{state.shipmentDetails.shipment_type === 'airport_to_airport' && (
								<div>
									<small className="text-gray-400 font-bold">
										Airports
										<span className="text-red-500"> * </span>
									</small>
									<div className=" flex  border-b-2 mt-2 p-2">
										<select
											disabled={Object.keys(country).length === 0}
											className="w-full outline-none bg-white"
											value={JSON.stringify(airport)}
											onChange={(e) => handleChangeAirport(JSON.parse(e.target.value))}
											required
										>
											<option value="">Select Airport</option>

											{airportList.map((airport: any, key: number) => (
												<option value={JSON.stringify(airport)} key={key}>
													{airport.name}, {airport.city}
												</option>
											))}
										</select>
										<div className="text-xl text-gray-500">
											<MdOutlineMyLocation />
										</div>
									</div>
								</div>
							)}

							{state.shipmentDetails.shipment_type === 'door_to_door' && (
								<>
									<div>
										<small className="text-gray-400 font-bold">
											State <span className="text-red-500"> * </span>
										</small>
										<div className=" border-b-2 flex  mt-2 p-2 bg-white">
											<select
												className="w-full outline-none"
												value={JSON.stringify(countryState)}
												onChange={(e) => handleChangeState(JSON.parse(e.target.value))}
											>
												<option value="0">Select State</option>

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

									<div>
										<small className="text-gray-400 font-bold">
											City <span className="text-red-500"> * </span>
										</small>
										<div className=" border-b-2 flex  mt-2 p-2 bg-white">
											<select
												className="w-full outline-none"
												value={JSON.stringify(stateCity)}
												onChange={(e) => handleChangeCity(JSON.parse(e.target.value))}
											>
												<option value="0">Select City</option>

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
											Address <span className="text-red-500"> * </span>
										</small>
										<div className=" border-b-2 flex  mt-2 p-2 bg-white">
											<div className="text-xl text-gray-500">
												<RiSearch2Line />
											</div>
											<input
												type="text"
												className="w-full outline-none px-2 bg-white"
												value={address ?? ''}
												placeholder="type in shipment street address location"
												onChange={(e) => handleChangeAddress(e.target.value)}
												disabled={Object.keys(country).length === 0}
												required
											/>
											<div className="text-xl text-gray-500">
												<MdAddLocationAlt />
											</div>
										</div>
									</div>
								</>
							)}
							{shipmentDetails.final_destination?.latitude &&
								shipmentDetails.final_destination?.longitude && (
									<>
										<AddressMap
											formatted_address={
												shipmentDetails?.final_destination?.formattedAddress as string
											}
											geoLocation={{
												lng: shipmentDetails.final_destination?.longitude as number,
												lat: shipmentDetails.final_destination?.latitude as number,
											}}
										/>
										<div className=" font-extrabold text-xl text-red-500">
											<span className="underline">Address Found: </span>
											{shipmentDetails.final_destination?.formattedAddress}
										</div>
									</>
								)}
							{showLoader && shipmentDetails.final_destination?.formattedAddress === '' && (
								<div className="w-full flex items-center justify-center">
									<RingLoader text="Validating address..." textColor="text-blue-900" />
								</div>
							)}
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-5">
						{shipmentDetails.final_destination?.formattedAddress === '' ? (
							<button
								disabled={showLoader}
								type="submit"
								className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
							>
								Validate Address
							</button>
						) : (
							<>
								{state.editShipment ? (
									<button
										type="button"
										onClick={() => handleUpdateShipment(state.shipmentDetails.shipment_id)}
										disabled={showLoader}
										className="hover:shadow-xl flex items-center justify-center hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md"
									>
										{!showLoader ? (
											<span>Update Shipment</span>
										) : (
											<RingLoader size={30} textColor="text-blue-900" loaderColor="#fff" />
										)}
									</button>
								) : (
									<button
										type="button"
										onClick={moveNext}
										disabled={showLoader}
										className="hover:shadow-xl flex items-center justify-center hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md"
									>
										{!showLoader ? (
											<span>Next</span>
										) : (
											<RingLoader size={30} textColor="text-blue-900" loaderColor="#fff" />
										)}
									</button>
								)}
							</>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default RecipientDetails;
