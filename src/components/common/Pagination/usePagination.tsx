import { useEffect, useState } from 'react';

function usePagination(setCurrentPage: React.Dispatch<React.SetStateAction<number>>, currentPage:number) {
	const nextPage=()=>{
    setCurrentPage(currentPage+1)

  }
  const prevPage=()=>{
    setCurrentPage(currentPage-1)
  }
	return {
nextPage,
prevPage
	};
}

export default usePagination;
