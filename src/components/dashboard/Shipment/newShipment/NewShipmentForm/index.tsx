import { FC } from 'react';
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
import { ToastContainer } from 'react-toastify';
import Slider from 'react-slick';

const NewShipmentForm = () => {
	const {
		setCountryCode,
		handleSubmitNewShipmentForm,
		setStateCode,
		setCitySelected,
		setAddress,
		setShipmentDetails,
		handleImageChange,
		removeImage,
		moveNext,
		previewImage,
		formattedAddress,
		showLoader,
		latitude,
		longitude,
		image_slider_settings,
		shipmentDetails,
		citySelected,
		address,
		mapAddress,
		countryCode,
		stateCode,
	} = useNewShipmentForm();
	return (
		<>
			<div className="inline-flex flex-col items-center w-full ">
				<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<form className=" w-9/12 my-5" onSubmit={handleSubmitNewShipmentForm}>
					<div className="mt-3">
						<label className="text-sm text-gray-400">
							Shipment title <span className="text-red-500"> * </span>
						</label>
						<div className="border flex rounded-lg mt-2 p-2 bg-white">
							<input
								className="w-full outline-none"
								type="text"
								value={shipmentDetails.shipment_title as string}
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
						<div className="border flex rounded-lg mt-2 p-2 bg-white">
							<textarea
								className="w-full outline-none"
								value={shipmentDetails.shipment_description as string}
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
						<div className="border flex rounded-lg mt-2 p-2 bg-white">
							<input
								className="w-full outline-none"
								type="number"
								value={shipmentDetails.shipment_weight as string}
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

					<div className="mt-3">
						<label className="text-sm text-gray-400">
							Images
							<span className="text-red-500"> * </span>
						</label>
						<Slider {...image_slider_settings}>
							{previewImage.map((image, index) => (
								<div
									key={index}
									className="relative w-32 h-32 border-2  bg-slate-200 shadow flex items-center justify-center rounded-xl"
								>
									<img
										src={typeof image === 'string' ? image : undefined}
										alt="Shipment"
										className="object-cover w-full  h-full rounded-xl"
									/>

									<div className="absolute transition-all ease-in-out duration-150 hover:opacity-100 opacity-0 hover:bg-black hover:bg-opacity-40 h-full w-full top-0 text-white flex items-center justify-center text-3xl rounded-xl">
										<div
											className=" cursor-pointer transition-all ease-in-out duration-75 hover:bg-red-900/90 p-2  rounded-full hover:border border-slate-50"
											onClick={() => removeImage(index)}
										>
											<AiOutlineClose />
										</div>
									</div>
								</div>
							))}
						</Slider>

						<div className="mt-10 w-1/2 h-10 border-2 bg-slate-200 shadow flex items-center justify-between pl-5 rounded-xl overflow-hidden">
							<label className=" w-full h-20 flex items-center justify-between cursor-pointer">
								<span>Upload shipment image</span>
								<div className="border-gray-500 border-dotted w-20 h-20 border-4 rounded-xl flex items-center justify-center">
									<BiCloudUpload className="text-3xl text-gray-500" />
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

					<div className="mt-7 border rounded-lg p-5 bg-white">
						<label className="text-lg text-gray-400">Shipment Current Location for pickup</label>

						<div className="flex flex-col space-y-5 mt-3">
							<div>
								<small className="text-gray-400 font-bold">
									Country
									<span className="text-red-500"> * </span>
								</small>
								<div className="border flex rounded-lg mt-2 p-2">
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
									State
									<span className="text-red-500"> * </span>
								</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<select
										className="w-full outline-none"
										value={stateCode}
										onChange={(e) => setStateCode(e.target.value)}
										disabled={countryCode === '' || countryCode === '0'}
										required
									>
										<option value="">Select State</option>

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
									City
									<span className="text-red-500"> * </span>
								</small>
								<div className="border flex rounded-lg mt-2 p-2">
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
									Address
									<span className="text-red-500"> * </span>
								</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<div className="text-xl text-gray-500">
										<RiSearch2Line />
									</div>
									<input
										type="text"
										className="w-full outline-none px-2"
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
							{showLoader && (
								<div className="w-full flex items-center justify-center">
									<RingLoader text="Validating address..." textColor="text-blue-900" />
								</div>
							)}
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-5">
						{formattedAddress == '' ? (
							<button
								disabled={showLoader}
								type="submit"
								className="hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md  bg-blue-100 font-bold text-blue-900 text-md"
							>
								Validate Address
							</button>
						) : (
							<button
								type="button"
								onClick={moveNext}
								className="hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md   bg-blue-100 font-bold text-blue-900 text-md"
							>
								Next
							</button>
						)}
					</div>
				</form>
				<ToastContainer />
			</div>
		</>
	);
};

export default NewShipmentForm;
