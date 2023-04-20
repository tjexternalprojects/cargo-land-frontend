import { BiHide, BiShow, Si1Password } from '@/assets'
import useUpdatePassword from './useUpdatePassword'

const index = () => {
    const {showPassword, setShowPassword} = useUpdatePassword()
  return (
    <form className='animate__animated animate__fadeInUp   md:w-9/12 w-full mb-5 md:px-0 ' >
    <div className="bg-white p-4 shadow-sm rounded-sm space-y-4 ">
        <div>
            <label className="text-sm text-gray-400">
                Current Password
            </label>
            <div className=" border-b-2 flex px-2 bg-white">
                <input className="w-full outline-none" type="text" required />
                <div className="text-xl text-gray-500">
                    <Si1Password />
                </div>
            </div>
        </div>

        <div>
            <label className="text-sm text-gray-400">New Password</label>
            <div className=" border-b-2 flex px-2 bg-white">
                <input className="w-full outline-none" type={!showPassword ? 'password' : 'text'} required />
                {!showPassword ? (
            <BiHide className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
        ) : (
            <BiShow className=" cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
        )}
            </div>
        </div>
    </div>

    <button
        type="button"
        className="hover:shadow-md w shadow-gray-50 shadow-sm mt-8 w-full p-2 rounded-sm  bg-red-700 font-bold text-white text-md"
    >
        Update Password
    </button>
</form>
  )
}

export default index
