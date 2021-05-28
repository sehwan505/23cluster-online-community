import React from "react";
import {range} from "lodash"

const Pagination = ({itemsCount, pageSize, currentPage, setPageNum, isComment}) =>{
	const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
	const startPoint = (pageCount > 10 ? pageCount - 10 : 1); 
	if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음
	const pages = range(startPoint, pageCount + 1);
	return (
		<table className="board-insert-table">
		<tbody>
		<tr>
		  <td className="paging">
		  {pages.map(page => (
			<span key={page} className={currentPage === page ? "on" : ""} onClick={() => {setPageNum(page);
				                                                                          if (!isComment)
			                                                                                {
																								localStorage.setItem('pageNum',page);}
																							}} 
																						style={{cursor:"pointer"}}>
				{page}
			</span>
		  ))}
		  </td>
		</tr>
		</tbody>
	    </table>
	);
}

export default Pagination;