import React from 'react';
import {useSelector} from 'react-redux';
function Pagination({
    currentPage,
    onPageChange,
    activeClass='active',
    nextPageText="Next",
    prevPageText="Prev",
    firstPageText='1st',
    lastPageText='Last'
}) {
    const {totalPages,products}=useSelector((state)=>state.product);
    if(products.length===0 || totalPages<=1) return null;

    const getPageNumbers=()=>{
        const pageNumbers=[];
        const pageWindow=2;
        for(let i=Math.max(1,currentPage-pageWindow);
    i<=Math.min(totalPages,currentPage+pageWindow);i++
    ){
        pageNumbers.push(i)
    }
    return pageNumbers;
    }
  return (
    <div className="flex justify-center items-center gap-2 p-2 rounded-lg mt-24">
       { /* Previous and First Buttons*/}
      {
        currentPage>1 &&(
            <>
            <button className="px-3 py-2 text-base font-bold text-[var(--bg-primary)] border border-[var(--border-color)] rounded hover:bg-[var(--primary-main)] hover:text-[var(--text-light)] transition-all shadow-sm" onClick={()=>onPageChange(1)}>{firstPageText}</button>
            <button className="px-3 py-2 text-base font-bold text-[var(--bg-primary)] border border-[var(--border-color)] rounded hover:bg-[var(--primary-main)] hover:text-[var(--text-light)] transition-all shadow-sm" onClick={()=>onPageChange(currentPage-1)}>{prevPageText}</button>
            </>
        )
      }

{/*Display Numbers*/}
{
    getPageNumbers().map((number)=>(
        <button 
          className={`px-3 py-2 text-base font-bold border rounded transition-all shadow-sm ${currentPage===number?`bg-[var(--primary-dark)] text-[var(--text-primary)] border-[var(--primary-main)] cursor-default shadow-sm ${activeClass}`:'text-[var(--bg-primary)] border-[var(--border-color)] hover:bg-[var(--primary-main)] hover:text-[var(--text-light)]'}`}
          key={number}
          onClick={()=>onPageChange(number)}
        >{number}</button>
    ))
}

{ /* Last and Next Buttons*/}
      {
        currentPage<totalPages &&(
            <>
            <button className="px-3 py-2 text-base font-bold text-[var(--bg-primary)] border border-[var(--border-color)] rounded hover:bg-[var(--primary-main)] hover:text-[var(--text-light)] transition-all shadow-sm" onClick={()=>onPageChange(currentPage+1)}>{nextPageText}</button>
            <button className="px-3 py-2 text-base font-bold text-[var(--bg-primary)] border border-[var(--border-color)] rounded hover:bg-[var(--primary-main)] hover:text-[var(--text-light)] transition-all shadow-sm" onClick={()=>onPageChange(totalPages)}>{lastPageText}</button>
            </>
        )
      }
    </div>
  )
}

export default Pagination
