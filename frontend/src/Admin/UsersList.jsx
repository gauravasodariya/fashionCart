import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../features/admin/adminSlice';
import Loader from '../components/Loader';

function UsersList() {
    const {users,loading,error,message}=useSelector(state=>state.admin);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    useEffect(()=>{
        dispatch(fetchUsers())
    },[dispatch])

const handleDelete=(userId)=>{
    const confirm=window.confirm('Are you sure you want to delete this user?')
    if(confirm){
        dispatch(deleteUser(userId))
    }
}
useEffect(()=>{
    if(error){
      toast.error(error,{position:'top-center',autoClose:3000});
      dispatch(removeErrors())
    }
    if(message){
        toast.success(message,{position:'top-center',autoClose:3000});
        dispatch(clearMessage())
       navigate('/admin/dashboard')
    }
  },[dispatch,error,message])
  return (
    <>
{loading?(<Loader/>):(   <>
   <Navbar/>
   <PageTitle title="All Users"/>
    <div className="min-h-[70vh] mt-[80px] p-5 bg-[#f9f9f9] rounded-lg shadow-lg">
        <h1 className="text-2xl mb-5 text-[#333]">All Users</h1>
        <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow">
                <thead>
                    <tr>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Sl No</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Name</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Email</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Role</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Created At</th>
                        <th className="text-left p-2.5 border border-[#ddd] bg-[var(--bg-secondary)] text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={user._id} className="even:bg-[#f2f2f2]">
                        <td className="text-left p-2.5 border border-[#ddd]">{index+1}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{user.name}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{user.email}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{user.role}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="text-left p-2.5 border border-[#ddd]">
                            <Link to={`/admin/user/${user._id}`} className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(0,123,255,0.1)]" style={{ color: 'var(--primary-main)', marginRight: '10px' }}><Edit/></Link>
                            <button className="inline-flex items-center justify-center p-1.5 rounded hover:bg-[rgba(220,53,69,0.1)]" style={{ color: '#f7364a', border: 'none', backgroundColor: 'transparent' }} onClick={()=>handleDelete(user._id)}><Delete/></button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

   <Footer/>
   
   </>)}
   </>
  )
}

export default UsersList
