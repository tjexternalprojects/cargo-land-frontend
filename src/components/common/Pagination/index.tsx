import React from 'react';
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
	GrNext,
	GrPrevious,
} from '@/assets';
import usePagination from './usePagination';

interface PaginationProps {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	currentPage: number;
	result?: number;
	loading: boolean;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
}
const index: React.FC<PaginationProps> = ({
	setCurrentPage,
	result,
	currentPage,
	loading,
	hasNextPage,
	hasPreviousPage,
}) => {
	const { nextPage, prevPage } = usePagination(setCurrentPage, currentPage);
	return (
		<div className="w-full flex justify-end">
			<div className="justify-center items-center gap-5 mt-10 pagination font-semibold bg-white p-2 inline-flex rounded-lg">
				<button
					onClick={prevPage}
					disabled={currentPage - 1 === 0 || loading || !hasPreviousPage}
					className={`w-7 h-7 rounded-full flex items-center justify-center   ${
						currentPage - 1 === 0 || loading || !hasPreviousPage
							? 'cursor-not-allowed '
							: 'cursor-pointer hover:bg-slate-200 bg-slate-100 hover:shadow  hover:transition-all hover:duration-1000'
					}`}
				>
					<HiOutlineChevronDoubleLeft className="w-5" />
				</button>

				<button
					onClick={nextPage}
					disabled={(result === 0 && currentPage - 1 !== 0) || loading || !hasNextPage}
					className={`w-7 h-7 rounded-full flex items-center justify-center   ${
						(result === 0 && currentPage - 1 !== 0) || loading || !hasNextPage
							? 'cursor-not-allowed '
							: 'cursor-pointer hover:bg-slate-200  bg-slate-100 hover:shadow  hover:transition-all hover:duration-1000'
					}`}
				>
					<HiOutlineChevronDoubleRight className="w-5" />
				</button>
			</div>
		</div>
	);
};

export default index;
