import { useEffect, useState } from 'react';

function usePagination(
	items_length: number,
	items_per_page: number,
	current_page: number,
	set_current_page: (newValue: number) => void
) {
	// page_number
	// items_per_page
	// total_items
	let total_pages = items_length / items_per_page;
	if (!Number.isInteger(total_pages)) total_pages = Math.floor(total_pages) + 1;

	const [pagination_btn_array, set_pagination_btn_array] = useState<number[]>([]);

	const [buttons_to_show, set_buttons_to_show] = useState(3);
	const sePagesToShow = (start_loop: number) => {
		set_pagination_btn_array([]);
		for (let i = start_loop; i <= total_pages; i++) {
			set_pagination_btn_array((prevArray) => [...prevArray, i]);
			if (i >= current_page + buttons_to_show - 1) {
				break;
			}
		}
	};

	const handleNext = () => {
		current_page < total_pages && set_current_page(current_page + 1);
		set_buttons_to_show(3);
		pagination_btn_array[pagination_btn_array.length - 1] != total_pages &&
			sePagesToShow(current_page);
	};
	const handlePrev = () => {
		set_buttons_to_show(2);
		current_page > 0 && set_current_page(current_page - 1);
		sePagesToShow(current_page - 1);
	};
	const handGoToLastPage = () => {};
	const handGoToFirstPage = () => {};

	useEffect(() => {
		sePagesToShow(current_page);
		console.log(total_pages);
	}, [total_pages]);
	return {
		handleNext,
		handlePrev,
		total_pages,
		items_length,
		pagination_btn_array,
	};
}

export default usePagination;
