import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteOrder, fetchAllOrders, removeErrors, removeSuccess } from '../features/admin/adminSlice';


function OrdersList() {
    const {orders,loading,error,success,message}=useSelector(state=>state.admin);
    
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchAllOrders())
    },[dispatch])

      const handleDelete=(id)=>{
        const confirm=window.confirm("Are you sure you want to delete this order?");
        if(confirm){
          dispatch(deleteOrder(id))
        }
      }
      useEffect(()=>{
        if(error){
          console.error(error);
          dispatch(removeErrors())
        }
        if(success){
          console.log(message);
          dispatch(removeSuccess());
          dispatch(clearMessage());
          dispatch(fetchAllOrders())
        }
      },[dispatch,error,success,message]);
      if(!orders && orders.length===0){
        return(
            <div className="min-h-[60vh] mt-[80px] p-6 bg-white rounded-lg shadow flex items-center justify-center">
                <p className="text-[#555]">No Orders Found</p>
            </div>
        )
      }
  return (
    <>
 {loading?(<Loader/>):(   <>
    <Navbar/>
    <PageTitle title="All Orders"/>
    <div className="p-5 bg-[#f9f9f9] rounded-lg shadow min-h-[70vh] mt-[70px]">
        <h1 className="text-2xl mb-5 text-[#333]">All Orders</h1>
        <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Sl No</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Order ID</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Status</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Total Price</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Number Of Items</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {orders && orders.map((order,index)=>(
                    <tr key={order._id} className="even:bg-[#f2f2f2]">
                        <td className="text-left p-2.5 border border-[#ddd]">{index+1}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{order._id}</td>
                        <td className={`text-left p-2.5 border border-[#ddd] ${order.orderStatus.toLowerCase()==='processing'?'bg-[rgba(255,0,0,0.1)] text-red-600':'bg-[rgba(0,255,0,0.1)] text-green-600'}`}>{order.orderStatus}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{order.totalPrice.toFixed(2)}/-</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{order.orderItems.length}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">
                            <Link to={`/admin/order/${order._id}`} className='inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(0,123,255,0.1)]' style={{ color: 'var(--primary-main)', marginRight: '10px' }}><Edit/></Link>
                            <button className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(220,53,69,0.1)]" style={{ color: '#f7364a', border: 'none', backgroundColor: 'transparent' }} onClick={()=>handleDelete(order._id)}><Delete/></button>
                        </td>
                    </tr>
                  ))  }
                </tbody>
            </table>
        </div>
    </div>
    <Footer/>
    </>)}
    </>
  )
}

export default OrdersList
