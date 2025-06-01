import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import { updateProduct } from "../features/admin/adminSlice";

function UpdateProduct() {
      const [name, setName] = useState("");
      const [price, setPrice] = useState("");
      const [description, setDescription] = useState("");
      const [category, setCategory] = useState("");
      const [stock, setStock] = useState("");
      const [image, setImage] = useState([]);
      const [oldImage, setOldImage] = useState([]);
      const [imagePreview, setImagePreview] = useState([]);
      const {product}=useSelector(state=>state.product)
      const {success,error,loading}=useSelector(state=>state.admin)
      
      
      const dispatch=useDispatch();
      const navigate=useNavigate();
      const {updateId}=useParams();
      const categories = ["mobile", "fruits", "laptop","shirt","shoes","pants","glass","watch","cookies","Pomegranate","socks","bag","mouse","headphone","bucket","bangle","ring","lcd","jacket","tops"];

      // Responsive adjustments for media-query equivalents
      const [isNarrow, setIsNarrow] = useState(window.innerWidth <= 840);
      useEffect(() => {
        const onResize = () => setIsNarrow(window.innerWidth <= 840);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
      }, []);

      const styles = {
        wrapper: {
          width: isNarrow ? '95%' : '700px',
          margin: '40px auto',
          padding: isNarrow ? '24px' : '32px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        title: {
          fontSize: '28px',
          fontWeight: 600,
          color: '#111827',
          textAlign: 'center',
          marginBottom: '40px'
        },
        form: {
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        },
        label: {
          display: 'block',
          fontWeight: 500,
          fontSize: '17px',
          color: 'var(--bg-secondary)',
          marginBottom: '8px'
        },
        input: {
          width: '90%',
          padding: '12px 16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          margin: '0 0 30px 0'
        },
        textarea: {
          width: '90%',
          padding: '12px 16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          margin: '0 0 30px 0',
          height: '120px',
          resize: 'none'
        },
        select: {
          width: '94%',
          padding: '12px 16px',
          margin: '0 auto 30px'
        },
        fileWrapper: {
          width: '88%',
          padding: '16px'
        },
        fileInput: {
          width: '100%',
          maxWidth: '720px',
          padding: '12px',
          border: '2px dashed #e5e7eb',
          borderRadius: '8px'
        },
        grid: {
          display: 'grid',
          gridTemplateColumns: isNarrow ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '16px',
          width: '90%',
          maxWidth: '720px'
        },
        image: {
          width: isNarrow ? '140px' : '100px',
          height: isNarrow ? '140px' : '100px',
          objectFit: 'cover',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        },
        submitBtn: {
          width: '100%',
          maxWidth: '720px',
          height: '48px',
          background: 'var(--bg-secondary)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 500
        }
      };
      useEffect(()=>{
        dispatch(getProductDetails(updateId))
      },[dispatch,updateId])
      useEffect(()=>{
        if(product){
          setName(product.name)
          setPrice(product.price)
          setDescription(product.description)
          setCategory(product.category)
          setStock(product.stock)
          setOldImage(product.image)
        }
      },[product])
  const handleImageChange=(e)=>{
    const files=Array.from(e.target.files);
    
    setImage([]);
    setImagePreview([]);

    files.forEach((file)=>{
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setImagePreview((old)=>[...old,reader.result]);
                setImage((old)=>[...old,reader.result]);

            }
        }
        reader.readAsDataURL(file)
    })
  }
  const updateProductSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set('name',name);
    myForm.set('price',price);
    myForm.set('description',description);
    myForm.set('category',category);
    myForm.set('stock',stock);
    image.forEach((img)=>{
        myForm.append("image",img)
    })
    dispatch(updateProduct({id:updateId,formData:myForm}))
  }
    useEffect(()=>{
      if(success){
        navigate('/admin/products')
      }
      if(error){
        console.error('Admin update product error:', error);
      }
    },[success,error])
  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Update Product</h1>
        <form style={styles.form} encType="multipart/form-data" onSubmit={updateProductSubmit}>
          <label htmlFor="name" style={styles.label}>Product Name</label>
          <input
            type="text"
            style={styles.input}
            required
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <label htmlFor="price" style={styles.label}>Product Price</label>
          <input
            type="number"
            style={styles.input}
            required
            id="price"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />

          <label htmlFor="description" style={styles.label}>Product Description</label>
          <textarea
            type="text"
            style={styles.textarea}
            required
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

          <label htmlFor="category" style={styles.label}>Product Category</label>
          <select
            name="category"
            id="category"
            style={styles.select}
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">Choose a Category</option>
                {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="stock" style={styles.label}>Product Stock</label>
          <input
            type="number"
            style={styles.input}
            required
            id="stock"
            name="stock"
            value={stock}
            onChange={(e)=>setStock(e.target.value)}
          />
          <label htmlFor="image" style={styles.label}>Product Images</label>
          <div style={styles.fileWrapper}>
            <input type="file" accept="image/" name="image" multiple style={styles.fileInput} onChange={handleImageChange}/>
          </div>
          <div style={styles.grid}>
            {imagePreview.map((img,index)=>(
                <img src={img} alt="Product Preview" key={index} style={styles.image} />
            ))}
          </div>
          <div style={styles.grid}>
            {oldImage.map((img,index)=>(
                <img src={img.url} alt="Old Product Preview" key={index} style={styles.image} />
            ))}
          </div>
          <button style={styles.submitBtn}>{loading?'Updating...':'Update'}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;
