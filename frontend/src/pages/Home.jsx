import React, { useEffect } from "react";
import { motion as Motion } from 'framer-motion';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from "../features/products/productSlice";

function Home() {
  const {loading,error,products}=useSelector((state)=>state.product);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct());
  },[])
  useEffect(()=>{
    // Log error to console for visibility; remove noisy toasts
    if(error){
      console.error('Product fetch error:', error);
    }
  },[error])
  return (
    <>
 {loading?
 (<Loader/>)  
 :( <>
    <PageTitle title="Home-My Website"/>
    <Navbar/>
    <ImageSlider/>
      <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{
        padding: '2rem',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '3rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          marginBottom: '2rem',
          color: 'var(--primary-dark)',
          textShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}>Trending Now</h2>
        <Motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3.5rem',
          width: '100%',
          maxWidth: '1200px',
          padding: '1rem'
        }}>
         {products.map((product,index)=>(
          <Product product={product} key={index}/>
         )) }
        </Motion.div>
      </Motion.div>
      <Footer />
    </>)}
    </>
  );
}

export default Home;
