import React from 'react'
import useForgotPassword from './useForgotPassword'
import { AiOutlineArrowLeft, MdAttachEmail } from '@/assets'
import RingLoader from '@/components/common/RingLoader';


const index = () => {
    const { closeForgotPassword , handleForgotPassword, setEmail,showLoading, email} = useForgotPassword()
    return (
        <form className=' space-y-3 w-full ' onSubmit={handleForgotPassword}>
            <div
                className="bg-white h-11 px-3 border-b border-blue-800 w-full  flex items-center shadow-md animate__animated animate__fadeInUp animate__faster "
            >
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Input Email address"
                    className="text-sm  flex-grow h-10 outline-none bg-transparent"
                    required
                />
                <MdAttachEmail />

            </div>
            <div className='animate__animated animate__fadeInUp animate__faster '>

                <button
                    disabled={showLoading}
                    className=" flex items-center justify-center hover:shadow-blue-100 hover:shadow-md w-full bg-gradient-to-br from-red-50 via-red  to-red-50 h-11 text-sm shadow-md "
                    type="submit"

                >
                    
                    {!showLoading ? <span>Send Reset Link</span> : <RingLoader size={50} textColor="text-blue-900" />}
                </button>
                <div className='p-4 w-full flex items-center text-blue-800 space-x-3 cursor-pointer' onClick={closeForgotPassword}><AiOutlineArrowLeft /> Login</div>
            </div>


        </form>
    )
}

export default index
