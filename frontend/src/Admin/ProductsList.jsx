import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchAdminProducts, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import Loader from '../components/Loader';

function ProductsList() {
    const {products,loading,error,deleting}=useSelector(state=>state.admin);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])
    useEffect(()=>{
        if(error){
            toast.error(error,{position:'top-center',autoClose:3000})
            dispatch(removeErrors());
        }
    },[dispatch,error])
    const handleDelete=(productId)=>{
        const isConfirmed=window.confirm('Are you sure you want to delete this product?')
        if(isConfirmed){
            dispatch(deleteProduct(productId)).then((action)=>{
                if(action.type==='admin/deleteProduct/fulfilled'){
                    toast.success("Product Deleted Successfully",{position:'top-center',autoClose:3000})
            dispatch(removeSuccess());
                }
            })
        }
        
    }
    
    if(!products || products.length===0){
        return(
            <div className="min-h-screen mt-[90px] p-5 bg-[#f9f9f9] rounded-lg shadow-lg">
                <h1 className="text-2xl mb-5 text-[#333]">Admin Products</h1>
                <p className="text-center p-[30px] bg-[#555] text-white">No Products Found</p>
            </div>
        )
    }
  return (
    <>
  {loading?(<Loader/>):( <>
   <Navbar/>
   <PageTitle title="All Products"/>
    <div className="min-h-screen mt-[90px] p-5 bg-[#f9f9f9] rounded-lg shadow-lg">
        <h1 className="text-2xl mb-5 text-[#333]">All Products</h1>
        <table className="w-full border-collapse mt-2 bg-white shadow">
            <thead>
                <tr>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Sl No</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Product Image</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Product Name</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Price</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Ratings</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Category</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Stock</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Created At</th>
                    <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Actions</th>
                </tr>
            </thead>
            <tbody>
             {   products.map((product,index)=>(
                <tr key={product._id} className="even:bg-[#f2f2f2]">
                    <td className="text-left p-2.5 border border-[#ddd]">{index+1}</td>
                    <td className="text-left p-2.5 border border-[#ddd]"><img src={product.image[0].url} alt={product.name} className='w-[70px] h-[70px]'/></td>
                    <td className="text-left p-2.5 border border-[#ddd]">{product.name}</td>
                    <td className="text-left p-2.5 border border-[#ddd]">{product.price}/-</td>
                    <td className="text-left p-2.5 border border-[#ddd]">{product.ratings}</td>
                    <td className="text-left p-2.5 border border-[#ddd]">{product.category}</td>
                    <td className="text-left p-2.5 border border-[#ddd]">{product.stock}</td>
                    <td className="text-left p-2.5 border border-[#ddd]">{new Date(product.createdAt).toLocaleString()}</td>
                    <td className="text-left p-2.5 border border-[#ddd]">
                        <Link to={`/admin/product/${product._id}`} className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(0,123,255,0.1)]" style={{ color: 'var(--primary-main)', marginRight: '10px' }}><Edit/></Link>
                        <button className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(220,53,69,0.1)]" style={{ color: '#f7364a', backgroundColor: 'transparent', border: 'none' }}  disabled={deleting[product._id]} onClick={()=>handleDelete(product._id)}>{deleting[product._id]?<Loader/>:<Delete/>}</button>
                    
                    </td>
                </tr>
             ))}
            </tbody>
        </table>
    </div>
   <Footer/>
   </>)}
   </>
  )
}

export default ProductsList
