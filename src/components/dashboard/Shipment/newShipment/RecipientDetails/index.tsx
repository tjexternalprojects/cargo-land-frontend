import { FC } from 'react';
import {
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

import useRecipientDetails from './useRecipientDetails';

const RecipientDetails = () => {
	const {
		countryCode,
		stateCode,
		address,
		citySelected,
		mapAddress,
		shipmentDetails,
		longitude,
		latitude,
		formattedAddress,
		showLoading,
		moveNext,
		setShipmentDetails,
		setCitySelected,
		setAddress,
		setCountryCode,
		setStateCode,
		handleRecipientDetails,
	} = useRecipientDetails();
	return (
		<>
			<div className="inline-flex flex-col items-center w-full">
				<div className="bg-blue-900 rounded-full text-white text-3xl p-2">
					<RiUserReceivedLine />
				</div>
				<p className="text-xl mt-4">Recipient Details</p>

				<form className=" w-9/12 my-5" onSubmit={handleRecipientDetails}>
					<div className="bg-white p-4 shadow-sm rounded-sm">
						<label className="text-sm text-gray-400">
							Recipient Full Name <span className="text-red-500"> * </span>{' '}
						</label>
						<div className=" border-b-2 flex  mt-2 p-2 bg-white">
							<input
								className="w-full outline-none"
								type="text"
								value={shipmentDetails.recipient_full_name as string}
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
									value={shipmentDetails.recipient_email as string}
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
										value={countryCode}
										onChange={(e) => setCountryCode(e.target.value)}
										required
									>
										<option value="0">Select Country</option>
										{Country.getAllCountries().map((country) => (
											<option key={country.isoCode} value={country.isoCode} className="space-x-10">
												{country.name}
											</option>
										))}
									</select>
									<div className="text-xl text-gray-500">
										{Country.getCountryByCode(countryCode)?.flag}
									</div>
								</div>
							</div>

							<div>
								<small className="text-gray-400 font-bold">
									State <span className="text-red-500"> * </span>
								</small>
								<div className=" border-b-2 flex  mt-2 p-2 bg-white">
									<select
										className="w-full outline-none"
										value={stateCode}
										onChange={(e) => setStateCode(e.target.value)}
										disabled={countryCode === '' || countryCode === '0'}
										required
									>
										<option value="0">Select State</option>

										{State.getStatesOfCountry(countryCode).map((states) => (
											<option value={states.isoCode} key={states.isoCode}>
												{states.name}
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
										disabled={stateCode === '' || stateCode === '0'}
										className="w-full outline-none"
										value={citySelected}
										onChange={(e) => setCitySelected(e.target.value)}
										required
									>
										<option value="0">Select City</option>

										{City.getCitiesOfState(countryCode, stateCode).map((cities, key) => (
											<option value={cities.name} key={key}>
												{cities.name}
											</option>
										))}
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
										value={address}
										placeholder="type in shipment street address location"
										onChange={(e) => setAddress(e.target.value)}
										disabled={citySelected === '' || citySelected === '0'}
										required
									/>
									<div className="text-xl text-gray-500">
										<MdAddLocationAlt />
									</div>
								</div>
							</div>
							{latitude && longitude && (
								<>
									<AddressMap
										formatted_address={formattedAddress}
										geoLocation={{ lng: longitude, lat: latitude }}
									/>
									<div className=" font-extrabold text-xl text-red-500">
										<span className="underline">Address Found: </span>
										{formattedAddress}
									</div>
								</>
							)}
							{showLoading && formattedAddress ===''  && (
								<div className="w-full flex items-center justify-center">
									<RingLoader text="Validating address..." textColor="text-blue-900" />
								</div>
							)}
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-5">
						{formattedAddress === '' ? (
							<button
								disabled={showLoading}
								type="submit"
								className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
							>
								Validate Address
							</button>
						) : (
							<button
								type="button"
								onClick={moveNext}
								disabled={showLoading}
								className="hover:shadow-xl flex items-center justify-center hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md"
							>
								{!showLoading ? <span>Next</span> : <RingLoader size={30} textColor="text-blue-900" loaderColor="#fff"  />}
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default RecipientDetails;
