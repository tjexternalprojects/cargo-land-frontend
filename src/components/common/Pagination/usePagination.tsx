import { useEffect, useState } from "react";

function usePagination(
  itmes_length: number,
  items_per_page: number,
  current_page: number,
  set_current_page: (newValue: number) => void
) {
  // page_number
  // items_per_page
  // total_items
  let total_pages = itmes_length / items_per_page;
  if (!Number.isInteger(total_pages)) total_pages = Math.floor(total_pages) + 1;

  const [pagination_btn_array, set_pagination_btn_array] = useState<number[]>([]);

  const [buttons_to_show, set_buttons_to_show] =  useState(3)
  const sePagesToShow = () => {
    set_pagination_btn_array([])
    let btn_array = []
    console.log(current_page, 'current page')
    for (let i = current_page; i <= total_pages; i++) {
      console.log(i)
      btn_array.push(i)
      // set_pagination_btn_array((prevArray) => [...prevArray, i]);
      set_pagination_btn_array(btn_array)
      if (i >= current_page + buttons_to_show-1) {
        break;
      }
    }
  };

  const handleNext = () => {
    current_page < total_pages && set_current_page(current_page + 1);
    pagination_btn_array[pagination_btn_array.length-1]!=total_pages  && sePagesToShow()
  };
  const handlePrev = () => {
    current_page > 0 && set_current_page(current_page-1);
    sePagesToShow()
    // const new_btn = pagination_btn_array
    // set_pagination_btn_array(new_btn)
  };
  const handGoToLastPage = () => {};
  const handGoToFirstPage = () => {};

  useEffect(() => {
    sePagesToShow();
    console.log(total_pages);
  }, [total_pages]);
  return {
    handleNext,
    handlePrev,
    total_pages,
    itmes_length,
    pagination_btn_array,
  };
}

export default usePagination;
