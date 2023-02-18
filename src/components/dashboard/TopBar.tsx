import React from 'react'
import {BiFilter, RiSearch2Line, userImg} from '../../assets'
const TopBar = () => {
  return (
    <div className='flex w-full gap-10 justify-between items-stretch'>
        <form className='w-full'>
            <div className='flex px-3 items-center space-x-3 bg-white rounded-xl border h-full'>
            <RiSearch2Line/>
            <input type="text" placeholder='Search parcel by Tracking Number' className='w-full outline-none h-full' />
            </div>
        </form>
        <div className='text-blue-900 bg-white p-1 rounded-full text-3xl'>
            <BiFilter/>
        </div>
        <button className=' flex items-center text-md  text-blue-900 rounded-3xl  px-4 hover:transition-all duration-150 ease-in-out hover:shadow-xl hover:shadow-blue-100 bg-gradient-to-t from-white via-slate-100 to-slate-100 shadow-lg shadow-slate-300'>New&nbsp;Shipment&nbsp;+</button>
      
    
    </div>
  )
}

export default TopBar