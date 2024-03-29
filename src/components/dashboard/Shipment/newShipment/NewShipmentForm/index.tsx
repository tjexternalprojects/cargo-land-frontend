import { FC, useEffect } from 'react';
import {
	AiOutlineClose,
	BiCloudUpload,
	GiWeight,
	GoPackage,
	MdAddLocationAlt,
	MdDescription,
	MdOutlineMyLocation,
	MdOutlineShareLocation,
	MdOutlineSubtitles,
	RiSearch2Line,
} from '@/assets';
import { Country, State, City } from 'country-state-city';
import useNewShipmentForm from './useNewShipmentForm';
import { AddressMap, RingLoader } from '@/components';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
const NewShipmentForm = () => {
	const {
		handleSubmitNewShipmentForm,
		setShipmentDetails,
		handleImageChange,
		removeImage,
		moveNext,
		handleChangeCountry,
		handleChangeState,
		handleChangeCity,
		handleChangeAddress,
		handleChangeAirport,
		handleChangeDeliveryType,
		handleImageScreenChange,
		imageFullScreen,
		airportList,
		airport,
		stateCity,
		address,
		countryState,
		previewImage,
		showLoader,
		country,
		shipmentDetails,
	} = useNewShipmentForm();

	return (
		<>
			<div className="inline-flex flex-col items-center w-full ">
				<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<form className=" md:w-9/12 my-5  px-3 md:px-0" onSubmit={handleSubmitNewShipmentForm}>
					<div className="bg-white p-4 shadow-sm rounded-sm">
						<div>
							<label className="text-sm text-gray-400">
								Shipment title <span className="text-red-500"> * </span>
							</label>
							<div className=" border-b-2 flex  mt-2 p-2 bg-white">
								<input
									className="w-full outline-none"
									type="text"
									value={shipmentDetails.shipment_title ?? ''}
									onChange={(e) =>
										setShipmentDetails({
											...shipmentDetails,
											shipment_title: e.target.value,
										})
									}
									required
								/>
								<div className="text-xl text-gray-500">
									<MdOutlineSubtitles />
								</div>
							</div>
						</div>

						<div className="mt-3">
							<label className="text-sm text-gray-400">
								Shipment Description
								<span className="text-red-500"> * </span>
							</label>
							<div className=" flex  border-b-2 mt-2 p-2 bg-white">
								<textarea
									className="w-full outline-none"
									value={shipmentDetails.shipment_description ?? ''}
									onChange={(e) =>
										setShipmentDetails({
											...shipmentDetails,
											shipment_description: e.target.value,
										})
									}
									required
								></textarea>
								<div className="text-xl text-gray-500">
									<MdDescription />
								</div>
							</div>
						</div>

						<div className="mt-3">
							<label className="text-sm text-gray-400">
								Shipment Weight (Kg)
								<span className="text-red-500"> * </span>
							</label>
							<div className=" flex  border-b-2 mt-2 p-2 bg-white">
								<input
									className="w-full outline-none"
									type="number"
									min={0}
									value={shipmentDetails.shipment_weight ?? ''}
									onChange={(e) =>
										setShipmentDetails({
											...shipmentDetails,
											shipment_weight: e.target.value,
										})
									}
									required
								/>
								<div className="text-xl text-gray-500">
									<GiWeight />
								</div>
							</div>
						</div>
					</div>
					<div className="mt-3">
						<label className="text-sm text-gray-400 mb-3">
							Images
							<span className="text-red-500"> * | Upload maximum of 5 images</span>
						</label>
						{previewImage?.length > 0 && (
							<div className="overflow-x-auto w-80-screen md:w-full">
								<ImageGallery
									items={previewImage}
									showThumbnails={true}
									showPlayButton={false}
									onScreenChange={handleImageScreenChange}
									renderItem={(item) => (
										<div
											className={` ${
												!imageFullScreen && 'md:w-32   h-44 image-gallery-image relative rounded-xl'
											} overflow-x-auto border-2 bg-slate-200 shadow flex items-center justify-center `}
										>
											<img
												className="object-cover w-full h-full rounded-xl"
												src={item.original}
												alt={item.originalAlt}
											/>

											{!imageFullScreen && (
												<div className="absolute transition-all ease-in-out duration-150 hover:opacity-100 hover:bg-black hover:bg-opacity-40 h-full w-full top-0 text-white flex items-center justify-center text-3xl rounded-xl">
													<div
														className="cursor-pointer transition-all ease-in-out duration-75 hover:bg-red-900/90 p-2 rounded-full hover:border border-slate-50"
														onClick={() => removeImage(previewImage.indexOf(item))}
													>
														<AiOutlineClose />
													</div>
												</div>
											)}
										</div>
									)}
									renderThumbInner={(item) => (
										<>
											{!imageFullScreen && (
												<div className=" h-10 w-full max-w-full overflow-x-auto whitespace-nowrap">
													<img
														className="object-contain w-full h-full "
														src={item.thumbnail}
														alt={item.thumbnailAlt}
													/>
												</div>
											)}
										</>
									)}
								/>
							</div>
						)}
						{/* </Slider> */}
						<br />
						{previewImage?.length < 5 && (
							<div className="mt-10  h-10  bg-blue-700 text-white shadow inline-flex items-center pl-5 overflow-hidden">
								<label className="  h-20 flex items-center justify-between space-x-3  cursor-pointer">
									<span className="text-sm md:text-md">Upload shipment image</span>
									<div className="w-20 h-20  rounded-l-full bg-blue-900  flex items-center justify-center">
										<BiCloudUpload className="text-3xl text-white" />
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
						)}
					</div>

					{/* Delivery type */}
					<div className="mt-7  shadow-sm rounded-sm p-4 bg-white">
						<div>
							<small className="text-gray-400 font-bold">
								Delivery Type <span className="text-red-500"> * </span>
							</small>
							<div className=" border-b-2 flex  mt-2 p-2 bg-white">
								<select
									className="w-full outline-none bg-white"
									value={(shipmentDetails.shipment_type as string) ?? ''}
									onChange={(e) => handleChangeDeliveryType(e.target.value)}
									required
								>
									<option value="" disabled>
										Select Delivery Type
									</option>

									<option value="door_to_door" className="space-x-10">
										Door to Door
									</option>
									<option value="airport_to_airport" className="space-x-10">
										Airport to Airport
									</option>
								</select>
							</div>
						</div>
					</div>
					<div className="mt-7  shadow-sm rounded-sm p-4 bg-white">
						<label className="text-lg text-gray-400">Shipment Current Location for pickup</label>

						{/* COUNTRY */}
						<div className="flex flex-col space-y-5 mt-3">
							<div>
								<small className="text-gray-400 font-bold">
									Country
									<span className="text-red-500"> * </span>
								</small>
								<div className=" flex  border-b-2 mt-2 p-2">
									<select
										disabled={shipmentDetails.shipment_type === ''}
										className="w-full outline-none bg-white"
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
							{shipmentDetails.shipment_type === 'door_to_door' && (
								<>
									<div>
										<small className="text-gray-400 font-bold">
											State
											<span className="text-red-500"> * </span>
										</small>
										<div className=" flex  border-b-2 mt-2 p-2">
											<select
												className="w-full outline-none bg-white"
												value={JSON.stringify(countryState)}
												onChange={(e) => handleChangeState(JSON.parse(e.target.value))}
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
									{/* // CITY */}
									<div>
										<small className="text-gray-400 font-bold">
											City
											<span className="text-red-500"> * </span>
										</small>
										<div className=" flex  border-b-2 mt-2 p-2">
											<select
												disabled={Object.keys(countryState).length === 0}
												className="w-full outline-none bg-white"
												value={JSON.stringify(stateCity)}
												onChange={(e) => handleChangeCity(JSON.parse(e.target.value))}
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
							{shipmentDetails.shipment_type === 'airport_to_airport' && (
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

											{airportList?.map((airport: any, key: number) => (
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
							{shipmentDetails.start_location?.latitude &&
								shipmentDetails.start_location?.longitude && (
									<>
										<AddressMap
											formatted_address={
												shipmentDetails?.start_location?.formattedAddress as string
											}
											geoLocation={{
												lng: shipmentDetails.start_location?.longitude as number,
												lat: shipmentDetails.start_location?.latitude as number,
											}}
										/>
										<div className=" font-extrabold text-xl text-red-500">
											<span className="underline">Address Found: </span>
											{shipmentDetails.start_location?.formattedAddress}
										</div>
									</>
								)}
							{showLoader && (
								<div className="w-full flex items-center justify-center">
									<RingLoader text="Validating address..." textColor="text-blue-900" />
								</div>
							)}
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-4">
						{shipmentDetails.start_location?.formattedAddress == '' ? (
							<button
								disabled={showLoader}
								type="submit"
								className="hover:shadow-md  shadow-gray-50 shadow-sm w-full p-2 rounded-sm  bg-blue-700 font-bold text-white text-md"
							>
								Validate Address
							</button>
						) : (
							<button
								type="button"
								onClick={moveNext}
								className="hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-700 font-bold text-white text-md"
							>
								Next
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default NewShipmentForm;
