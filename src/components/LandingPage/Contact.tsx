import React, { useState } from "react";
import {
  Background,
  BsCurrencyDollar,
  RiCustomerService2Line,
  TitleLine,
} from "@/assets";
import { UserServices } from "@/services";
import { RingLoader } from "..";
import { toast } from "react-toastify";
const Contact = () => {
	const [loading, setLoading]= useState(false)
  const { contactUs } = UserServices();
  const [payload, setPayload] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
	setLoading(true)
    await contactUs(payload).then(response=>{
		setLoading(false)
		toast.success(response.data.message, {
			progressClassName: 'bg-red-500 h-1',
			autoClose: 3000,
		});
		setPayload({...payload, fullName:"", email:"", message:""})
	},error=>{
		setLoading(false)
		toast.error(error.response.data.message, {
			progressClassName: 'bg-red-500 h-1',
			autoClose: 3000,
		});
	});
  };
  return (
    <div
      className=" my-24  bg-cover bg-center  bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="relative bg-gradient-to-b  from-white via-white/10 to-white px-10 md:px-20  lg:px-44 py-10">
        <div>
          <div
            className="absolute right-0 w-10 h-10 rounded-full bg-red-400"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="800"
            data-aos-anchor-placement="bottom-bottom"
          ></div>
          <div
            className="absolute right-8 w-5 h-5 rounded-full bg-red-100"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="800"
            data-aos-anchor-placement="bottom-bottom"
          ></div>
        </div>

        <div className="flex justify-center">
          <div className="text-center lg:max-w-3xl md:max-w-xl mb-12">
            <h2
              className="text-3xl font-bold text-blue-900  px-6"
              data-aos="flip-up"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos-anchor-placement="bottom-bottom"
            >
              Contact us
            </h2>
            <TitleLine />
          </div>
        </div>

        <div className="flex flex-wrap">
          <div
            className="grow shrink-0 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 px-3 lg:px-6"
            data-aos="fade-down-right"
            data-aos-duration="800"
          >
            <form onSubmit={handleSendEmail}>
              <div className="form-group mb-6">
                <input
				required
				value={payload.fullName}
				onChange={(e)=>setPayload({...payload, fullName:e.target.value})}
                  type="text"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                />
              </div>
              <div className="form-group mb-6">
                <input
				required
				value={payload.email}
				onChange={(e)=>setPayload({...payload, email:e.target.value})}
                  type="email"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput8"
                  placeholder="Email address"
                />
              </div>
              <div className="form-group mb-6">
                <textarea
				required
				value={payload.message}
				onChange={(e)=>setPayload({...payload, message:e.target.value})}
                  className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
                  id="exampleFormControlTextarea13"
                  rows={3}
                  placeholder="Message"
                ></textarea>
              </div>
              {/* <div className="form-group form-check text-center mb-6">
                <input
                  type="checkbox"
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                  id="exampleCheck87"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="exampleCheck87"
                >
                  Send me a copy of this message
                </label>
              </div> */}
              <button
			  disabled={loading}
                type="submit"
                className="
          w-full
          px-6
        
          bg-blue-900
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out flex items-center justify-center"
              >
				{loading ? <RingLoader size={30} textColor="text-blue-900" loaderColor="#fff" /> :
                <span className="  py-2">Send</span>}
              </button>
            </form>
          </div>
          <div className="" data-aos="fade-down-left" data-aos-duration="800">
            <div className="flex flex-wrap">
              <div className="mb-12 grow-0 gap-10 shrink-0 basis-auto w-full flex flex-col justify-between lg:w-6/12 px-3 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className=" bg-blue-900 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                      <RiCustomerService2Line className="text-3xl text-white" />
                    </div>
                  </div>
                  <div className="grow ml-6">
                    <p className="font-bold mb-1">Technical support</p>
                    <p className="text-gray-500">support@example.com</p>
                    <p className="text-gray-500">+1 234-567-89</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0">
                    <div className=" bg-blue-900 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                      <BsCurrencyDollar className="text-3xl text-white" />
                    </div>
                  </div>
                  <div className="grow ml-6">
                    <p className="font-bold mb-1">Sales questions</p>
                    <p className="text-gray-500">sales@example.com</p>
                    <p className="text-gray-500">+1 234-567-89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
