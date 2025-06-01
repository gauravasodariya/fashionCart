import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, deleteReview, fetchAdminProducts, fetchProductReviews, removeErrors, removeSuccess } from "../features/admin/adminSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
function ReviewsList() {
    const {products,loading,error,reviews,success,message}=useSelector(state=>state.admin);
    const navigate=useNavigate();
    
    const [selectedProduct,setSelectedProduct]=useState(null)
    
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAdminProducts())
    },[dispatch])


      const handleViewReviews=(productId)=>{
        setSelectedProduct(productId);
        dispatch(fetchProductReviews(productId))
      }
      const handleDeleteReview=(productId,reviewId)=>{
        const confirm=window.confirm('Are you sure you want to delete this review?');
        if(confirm){
            dispatch(deleteReview({productId,reviewId}))
        }
      }

      useEffect(()=>{
        if(error){
          toast.error(error,{position:'top-center',autoClose:3000});
          dispatch(removeErrors())
        }
        if(success){
            toast.success(message,{position:'top-center',autoClose:3000});
            dispatch(removeSuccess())
            dispatch(clearMessage())
            navigate("/admin/products")
          }
      },[dispatch,error,success,message])
      if(!products || products.length===0){
        return(
            <div className="max-w-[1200px] mx-auto my-10 p-5 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-semibold text-center mb-5 text-[#333]">Admin Reviews</h1>
                <p>No Product Found</p>
            </div>
        )
      }
  return (
    <>
 {loading?(<Loader/>):(   <>
      <Navbar />
      <PageTitle title="All Reviews" />
      <div className="max-w-[1200px] mx-auto my-10 p-5 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-5 text-[#333]">All Products</h1>
        <table className="w-full border-collapse mt-5">
            <thead>
                <tr>
                    <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Sl No</th>
                    <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Product Name</th>
                    <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Product Image</th>
                    <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Number of Reviews</th>
                    <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,index)=>(
                    <tr key={product._id} className="hover:bg-[#f1f1f1]">
                    <td className="p-3 border-b">{index+1}</td>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b">
                        <img src={product.image[0].url} alt={product.name} className="w-[80px] h-[80px] object-cover rounded" />
                    </td>
                    <td className="p-3 border-b">{product.numOfReviews}</td>
                    <td className="p-3 border-b">
                     {product.numOfReviews>0 &&(   <button className="px-4 py-2 rounded bg-[var(--bg-secondary)] text-white hover:bg-[var(--bg-primary)]" onClick={()=>handleViewReviews(product._id)}>View Reviews</button>)}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

      {selectedProduct  && reviews && reviews.length>0 &&(<div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5 text-[#333]">Reviews for Product</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Sl No</th>
                        <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Reviewer Name</th>
                        <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Rating</th>
                        <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Comment</th>
                        <th className="text-left p-3 border-b bg-[var(--bg-secondary)] text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                   { reviews.map((review,index)=>(
                    <tr key={review._id} className="hover:bg-[#f1f1f1]">
                        <td className="p-3 border-b">{index+1}</td>
                        <td className="p-3 border-b">{review.name}</td>
                        <td className="p-3 border-b">{review.rating}</td>
                        <td className="p-3 border-b">{review.comment}</td>
                        <td className="p-3 border-b">
                            <button className="px-3 py-2 rounded" style={{ backgroundColor: 'transparent', border: 'none', color: '#f7364a' }} onClick={()=>handleDeleteReview(selectedProduct,review._id)}><Delete/></button>
                        </td>
                    </tr>
                   ))}
                </tbody>
            </table>
        </div>)}
      </div>
      <Footer />
    </>)}
    </>
  );
}

export default ReviewsList;
