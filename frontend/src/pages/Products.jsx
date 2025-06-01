import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import NoProducts from '../components/NoProducts';
import Pagination from '../components/Pagination';

function Products() {
    const {loading,error,products}=useSelector(state=>state.product);
    const dispatch=useDispatch();
    const location=useLocation();
   const searchParams= new URLSearchParams(location.search);
   const keyword=searchParams.get("keyword")
   const category=searchParams.get("category")
   const pageFromURL=parseInt(searchParams.get("page"),10) ||1
   const minRatingFromURL=parseFloat(searchParams.get('minRating')) || 0
   const priceMinFromURL=parseFloat(searchParams.get('priceMin'))
   const priceMaxFromURL=parseFloat(searchParams.get('priceMax'))
   const sortFromURL=searchParams.get('sort')||''
    const [currentPage,setCurrentPage]=useState(pageFromURL);
    const [minRating,setMinRating]=useState(minRatingFromURL)
    const [priceMin,setPriceMin]=useState(Number.isFinite(priceMinFromURL)?priceMinFromURL:'' )
    const [priceMax,setPriceMax]=useState(Number.isFinite(priceMaxFromURL)?priceMaxFromURL:'' )
    const [sort,setSort]=useState(sortFromURL)
    const navigate=useNavigate();
   const categories=["laptop","mobile","tv","fruits","glass"];
   const [hoveredCategory, setHoveredCategory] = useState(null);
   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

   useEffect(() => {
     const onResize = () => setIsMobile(window.innerWidth <= 768);
     window.addEventListener('resize', onResize);
     return () => window.removeEventListener('resize', onResize);
   }, []);

   useEffect(()=>{
        dispatch(getProduct({keyword,page:currentPage,category,minRating,priceMin:priceMin||undefined,priceMax:priceMax||undefined,sort}))
      },[dispatch,keyword,currentPage,category,minRating,priceMin,priceMax,sort])
   useEffect(()=>{
          if(error){
            console.error(error.message);
            dispatch(removeErrors())
          }
        },[dispatch,error])
        useEffect(()=>{
          if(products.length>0){
            const prices=products.map(p=>p.price).filter(n=>typeof n==='number');
            if(prices.length>0){
              const min=Math.min(...prices);
              const max=Math.max(...prices);
              if(priceMin==='') setPriceMin(min);
              if(priceMax==='') setPriceMax(max);
            }
          }
        },[products])
        const handlePageChange=(page)=>{
          if(page!==currentPage){
            setCurrentPage(page);
            const newSearchParams=new URLSearchParams(location.search);
            if(page===1){
              newSearchParams.delete('page')
            }else{
              newSearchParams.set('page',page)
            }
            navigate(`?${newSearchParams.toString()}`)
          }
        }

        const handleCategoryClick=(category)=>{
          const newSearchParams=new URLSearchParams(location.search);
          newSearchParams.set('category',category)
          newSearchParams.delete('page')
          navigate(`?${newSearchParams.toString()}`)
        }
        const applyFilters=()=>{
          const newSearchParams=new URLSearchParams(location.search);
          if(minRating>0){ newSearchParams.set('minRating',minRating) } else { newSearchParams.delete('minRating') }
          if(priceMin!=='' && Number.isFinite(parseFloat(priceMin))){ newSearchParams.set('priceMin',priceMin) } else { newSearchParams.delete('priceMin') }
          if(priceMax!=='' && Number.isFinite(parseFloat(priceMax))){ newSearchParams.set('priceMax',priceMax) } else { newSearchParams.delete('priceMax') }
          if(sort){ newSearchParams.set('sort',sort) } else { newSearchParams.delete('sort') }
          newSearchParams.delete('page')
          navigate(`?${newSearchParams.toString()}`)
        }
  return (
    <>
{loading?(<Loader/>):(   <>
   <PageTitle title="All Products"/>
   <Navbar/>
   {error && (
     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '10px 12px', background: '#fdecea', color: '#611a15', border: '1px solid #f5c6cb', borderRadius: '8px' }}>
       {typeof error === 'string' ? error : (error.message || 'An error occurred')}
     </div>
   )}
   <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px', marginTop: '100px', ...(isMobile ? { flexDirection: 'column' } : {}) }}>
        <Motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ flex: '0 0 250px', backgroundColor: 'var(--text-light)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', ...(isMobile ? { width: '100%' } : {}) }}>
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>CATEGORIES</h3>
            {/* Render Categories */}
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {
                categories.map((category)=>{
                  const isHovered = hoveredCategory === category;
                  return(
                    <li
                      key={category}
                      onClick={()=>handleCategoryClick(category)}
                      onMouseEnter={() => setHoveredCategory(category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      style={{ margin: '10px 0', padding: '8px', cursor: 'pointer', fontSize: '16px', textTransform: 'uppercase', transition: 'background-color 0.3s', borderRadius: '4px', color: 'var(--border-color)', backgroundColor: isHovered ? '#efefef' : 'transparent' }}
                    >
                      {category}
                    </li>
                  )
                })
              }
            </ul>
            <div style={{ marginTop: '20px', borderTop: '1px solid #efefef', paddingTop: '12px' }}>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>FILTERS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#555' }}>Min Rating</label>
                  <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={(e)=>setMinRating(parseFloat(e.target.value))} style={{ width: '100%' }} />
                  <div style={{ fontSize: '12px', color: '#777' }}>{minRating}+</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Min Price</label>
                    <input type="number" value={priceMin} onChange={(e)=>setPriceMin(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '14px', color: '#555' }}>Max Price</label>
                    <input type="number" value={priceMax} onChange={(e)=>setPriceMax(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#555' }}>Sort by Price</label>
                  <select value={sort} onChange={(e)=>setSort(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}>
                    <option value="">None</option>
                    <option value="price_asc">Low to High</option>
                    <option value="price_desc">High to Low</option>
                  </select>
                </div>
                <button onClick={applyFilters} style={{ width: '100%', background: 'var(--primary-main)', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Apply Filters</button>
              </div>
            </div>
        </Motion.div>
        <Motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           {products.length>0?( <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {products.map((product)=>(
                <Product key={product._id} product={product}/>
            ))}
            </div>):(
              <NoProducts keyword={keyword}/>
            )}
            <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            />
        </Motion.div>
   </Motion.div>
   <Footer/>
   </>)}
   </>
  )

}

export default Products
