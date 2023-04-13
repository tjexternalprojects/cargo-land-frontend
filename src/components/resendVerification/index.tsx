import React from 'react'
import useResendVerification from './useResendVerification'
import { AiOutlineArrowLeft, MdAttachEmail} from '@/assets'
import {RingLoader} from '@/components';



const resendVerificationToken = () => {
    const {resendToken, setEmail, showLogin, state, showLoading}= useResendVerification()
  return (
    <div>
        <div className='text-sm text-blue-800 mb-3 text-center'>

      {state.resendTokenMessage}
        </div>
      <div className=" space-y-5 w-full">
			<form className=" text-gray-500 flex flex-col space-y-4" onSubmit={resendToken}>
				<div className="flex flex-col">
					<div
						className="bg-white h-11 px-3 border-b border-blue-800 flex items-center shadow-md animate__animated animate__fadeInUp animate__faster"
					>
						<input
							onChange={(e) => setEmail( e.target.value)}
							type="email"
							placeholder="Registered email address"
							className="text-sm flex-grow h-10 outline-none bg-white"
							required
						/>
						<MdAttachEmail />
					</div>
				</div>

				<div
					className="space-y-3 w-full  animate__animated animate__fadeInUp animate__faster"
				>

				<button
					disabled={showLoading}
					className="w-full  flex items-center justify-center hover:shadow-blue-100 hover:shadow-md  bg-gradient-to-br from-slate-50 via-white shadow-md to-slate-50 rounded-sm h-11 te	xt-sm"
					type="submit"
				>
					{!showLoading ? <span>Resend Link</span> : <RingLoader size={50} textColor="text-blue-900" />}
				</button>
			
				<div className='p-4 w-full flex items-center text-blue-800 space-x-3 cursor-pointer' onClick={showLogin}><AiOutlineArrowLeft /> Login</div>
					</div>
			</form>
			
			
		</div>
    </div>
  )
}

export default resendVerificationToken
