import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, removeErrors, removeSuccess, updateUserRole } from "../features/admin/adminSlice";

function UpdateRole() {
  const { userId } = useParams();
  const { user, success, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  useEffect(()=>{
    dispatch(getSingleUser(userId))
  },[dispatch,userId])
  const { name, email, role } = formData;
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(updateUserRole({userId,role}))
  }
    useEffect(()=>{
        if(success){
            toast.success("User Role Updated Successfully",{position:'top-center',autoClose:3000});
            dispatch(removeSuccess())
            navigate('/admin/users')
        }
      if(error){
        toast.error(error.message,{position:'top-center',autoClose:3000});
        dispatch(removeErrors())
      }
    },[dispatch,error,success,navigate])
  return (
    <>
      <Navbar />
      <PageTitle title="Update User Role" />
      {/* Wrapper */}
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        {/* Card */}
        <div className="p-5 bg-[#f9f9f9] rounded-lg shadow w-full max-w-[500px] h-[350px] mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-4 text-[#333]">Update User Role</h1>
          {/* Form */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-bold">Name</label>
              <input type="text" id="name" name="name" readOnly value={name} className="w-full p-2.5 border border-[#ddd] rounded"/>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                readOnly
                value={email}
                className="w-full p-2.5 border border-[#ddd] rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block mb-1 font-bold">Role</label>
              <select name="role" id="role" required value={role} onChange={handleChange} className="w-full p-2.5 border border-[#ddd] rounded">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-[var(--bg-secondary)] text-white rounded hover:bg-[var(--bg-primary)]">Update Role</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdateRole;
