import React, { FC } from 'react'
import { Rings } from 'react-loader-spinner';

interface RingLoaderProps {
 text:string
 textColor:string
}
const RingLoader: FC<RingLoaderProps> = ({text, textColor}) => {
  return (
    <div className='flex flex-col'>
    <Rings
    height="200"
    width="200"
    color="#1a365d"
    radius="6"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="rings-loading"
/>
<div className={`w-full text-center ${textColor}`}>{text}</div>
</div>
  )
}

export default RingLoader
