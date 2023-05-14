import React from "react";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  GrNext,
  GrPrevious,
} from "@/assets";
import usePagination from "./usePagination";
interface PaginationProps {
  itmes_length: number;
  items_per_page: number;
  current_page: number;
  set_current_page: (newValue: number) => void;
  start_range: number;
  end_range: number;
  set_start_range: (newValue: number) => void;
  set_end_range: (newValue: number) => void;
}
const index: React.FC<PaginationProps> = ({
  itmes_length,
  items_per_page,
  current_page,
  set_current_page,
}) => {
    
  const { pagination_btn_array, total_pages, handleNext, handlePrev } = usePagination(
    itmes_length,
    items_per_page,
    current_page,
    set_current_page,
  );
  return (
    <div className="w-full flex justify-center">
      <div className="justify-center items-center gap-5 mt-10 pagination font-semibold bg-white p-2 inline-flex shadow rounded-lg">
        <button  disabled={pagination_btn_array[0] === 1}  className={`w-10 h-10 rounded-full flex items-center justify-center   ${pagination_btn_array[0] === 1 ? 'cursor-not-allowed bg-slate-100': 'cursor-pointer hover:bg-slate-200  hover:shadow  hover:transition-all hover:duration-1000'}`}>
          <HiOutlineChevronDoubleLeft className="w-5" />
        </button>
        {current_page}
        <button
        onClick={handlePrev}
        disabled={pagination_btn_array[0] === 1}
        className={`w-10 h-10 rounded-full flex items-center justify-center   ${pagination_btn_array[0] === 1 ? 'cursor-not-allowed bg-slate-100': 'cursor-pointer hover:bg-slate-200  hover:shadow  hover:transition-all hover:duration-1000'}`}>
          <GrPrevious className="w-5 text-slate-100" />
        </button>
        {current_page - 1 != 0 && <div className="mb-3">...</div>}
        {pagination_btn_array.map((page: number) => (
          <div
            key={page}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-500  hover:shadow  hover:transition-all hover:duration-1000  ${current_page=== page ? 'bg-blue-800 text-white': 'bg-slate-400 text-white'}  
                             `}
          >
            {page}
          </div>
        ))}

{current_page + 1 < itmes_length  &&  <div className="mb-3">...</div>}
        <button disabled={pagination_btn_array[pagination_btn_array.length]>=total_pages } onClick={handleNext} className={`w-10 h-10 rounded-full flex items-center justify-center   ${pagination_btn_array[pagination_btn_array.length]>=total_pages ? 'cursor-not-allowed bg-slate-100': 'cursor-pointer hover:bg-slate-200  hover:shadow  hover:transition-all hover:duration-1000'}`}>
          <GrNext className="w-5" />
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200  hover:shadow hover:shadow-primary-2 hover:transition-all hover:duration-1000">
          <HiOutlineChevronDoubleRight className="w-5" />
        </div>
      </div>
    </div>
  );
};

export default index;
