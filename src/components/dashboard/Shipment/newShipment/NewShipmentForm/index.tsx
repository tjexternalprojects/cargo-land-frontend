import { FC } from 'react';
import {
	BiCloudUpload,
	GiWeight,
	GoPackage,
	MdAddLocationAlt,
	MdDescription,
	MdOutlineMyLocation,
	MdOutlineShareLocation,
	MdOutlineSubtitles,
	package1,
} from '@/assets';
import { Country, State, City } from 'country-state-city';
import useNewShipmentForm from './useNewShipmentForm';
import { AddressMap } from '@/components';
import { ToastContainer } from 'react-toastify';

interface NewShipmentFormProps {
	setAnimateTab: (value: string) => void;
}

const NewShipmentForm: FC<NewShipmentFormProps> = ({ setAnimateTab }) => {
	const {
		setCountryCode,
		handleSubmitNewShipmentForm,
		setStateCode,
		setCitySelected,
		setAddress,
		setShipmentDetails,
		handleImageChange,
		shipmentDetails,
		citySelected,
		address,
		mapAddress,
		countryCode,
		stateCode,
	} = useNewShipmentForm(setAnimateTab);

	return (
		<>
			<div className="inline-flex flex-col items-center w-full ">
				<div className="bg-blue-900 rounded-full text-white  text-3xl p-2">
					<GoPackage />
				</div>
				<p className="text-xl mt-4">Your shipment details</p>
				<form
					className=" w-9/12 my-5 border-2 border-red-400 "
					onSubmit={handleSubmitNewShipmentForm}
				>
					<div className="mt-3">
						<label className="text-sm text-gray-400">Shipment title</label>
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
						<label className="text-sm text-gray-400">Shipment Description</label>
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
						<label className="text-sm text-gray-400">Shipment Weight (Kg)</label>
						<div className="border flex rounded-lg mt-2 p-2 bg-white">
							<input
								className="w-full outline-none"
								type="text"
								value={shipmentDetails.shipment_weight as number}
								onChange={(e) =>
									setShipmentDetails({
										...shipmentDetails,
										shipment_weight: Number(e.target.value),
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
						<label className="text-sm text-gray-400">Images</label>
						<div className="border gap-3 flex rounded-lg mt-2 p-2    overflow-x-scroll bg-white w-full">
							{shipmentDetails.images &&
								Array.isArray(shipmentDetails.images) &&
								shipmentDetails.images.map((image, index) => (
									<div
										key={index}
										className=" w-32 h-32 border-2 bg-slate-200 shadow flex items-center justify-center rounded-xl"
									>
										<img
											src={typeof image === 'string' ? image : undefined}
											alt="Shipment"
											className="object-cover w-full  h-full rounded-xl"
										/>
									</div>
								))}
						</div>
						<div className="mt-5 w-1/2 h-10 border-2 bg-slate-200 shadow flex items-center justify-between pl-5 rounded-xl overflow-hidden">
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
						<ToastContainer />
					</div>

					<div className="mt-7 border rounded-lg p-5 bg-white">
						<label className="text-lg text-gray-400">Shipment Current Location for pickup</label>

						<div className="flex flex-col space-y-5 mt-3">
							<div>
								<small className="text-gray-400 font-bold">Country</small>
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
								<small className="text-gray-400 font-bold">State</small>
								<div className="border flex rounded-lg mt-2 p-2">
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
								<small className="text-gray-400 font-bold">City</small>
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
								<small className=" text-gray-400 font-bold">Address</small>
								<div className="border flex rounded-lg mt-2 p-2">
									<textarea
										className="w-full outline-none"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										disabled={citySelected === '' || citySelected === '0'}
										required
									></textarea>
									<div className="text-xl text-gray-500">
										<MdAddLocationAlt />
									</div>
								</div>
							</div>
							<span className="mt-2">Full Address: {mapAddress}</span>
							<AddressMap address={mapAddress} />
						</div>
					</div>

					<hr className="mt-5" />
					<div className="mt-5">
						<button
							type="submit"
							className="hover:shadow-xl hover:shadow-blue-100 shadow-md w-full p-2 rounded-md border border-slate-100 bg-blue-100 font-bold text-blue-900 text-md"
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default NewShipmentForm;
