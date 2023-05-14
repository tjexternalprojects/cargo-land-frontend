import React from 'react'
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight, GrNext, GrPrevious } from '@/assets'
import usePagination from './usePagination'
interface PaginationProps {
    itmes_length: number;
    items_per_page: number;
    start_range: number,
    end_range: number,
    set_start_range: (newValue: number) => void;
    set_end_range: (newValue: number) => void;
}
const index: React.FC<PaginationProps> = ({ itmes_length, items_per_page, start_range, end_range, set_start_range, set_end_range }) => {
    const {
       } = usePagination(itmes_length, items_per_page, start_range, end_range, set_start_range, set_end_range)
    return (

        <div className="w-full flex justify-center">
            <div className="justify-center items-center gap-5 mt-10 pagination font-semibold bg-white p-2 inline-flex shadow rounded-lg">
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000">
                    <HiOutlineChevronDoubleLeft className="w-5" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000" >
                    <GrPrevious className="w-5" />
                </div>
               <div className="mb-3">...</div>
              
                        <div
                            className='w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000 
                            bg-gradient-to-r from-gray-400 to-gray-100  shadow '
                          
                        >
                            1
                        </div>
                
                <div className="mb-3">...</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000" >
                    <GrNext className="w-5" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000" >
                    <HiOutlineChevronDoubleRight className="w-5" />
                </div>
            </div>
        </div>
    )
}

export default index
