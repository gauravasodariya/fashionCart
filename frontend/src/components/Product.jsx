import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({product}) {
    const [rating,setRating]=useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    const handleRatingChange=(_newRating)=>{
        setRating(rating)        
    }
  return (
    <Link to={`/product/${product._id}`} style={{
      textDecoration: 'none',
      color: 'inherit'
    }}>
   <div 
     style={{
       color: 'var(--text-primary)',
       borderRadius: '10px',
       boxShadow: isHovered ? 'var(--shadow-sm)' : 'var(--shadow-md)',
       textAlign: 'center',
       width: '250px',
       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
       margin: '1rem 0',
       display: 'flex',
       flexDirection: 'column',
       transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
     }}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
   >
    <img 
      src={(product.image && product.image.length>0)?product.image[0].url:''} 
      alt={product.name} 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        maxHeight: '200px'
      }}
    />
    <div style={{
      padding: '1rem'
    }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: 'var(--bg-primary)'
        }}>{product.name}</h3>
        <p style={{
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'var(--primary-main)',
          marginBottom: '1rem'
        }}><strong>Price</strong> {product.price}/-</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Rating
            value={product.ratings}
            onRatingChange={handleRatingChange}
            disabled={true}
            />
        </div>
        <span style={{
           fontSize: '0.85rem',
           color: 'var(--text-secondary)'
        }}>
           ( {product.numOfReviews} {product.numOfReviews===1?"Review":"Reviews"} )
        </span>
        <button 
          style={{
            backgroundColor: isButtonHovered ? 'var(--primary-dark)' : 'var(--primary-main)',
            color: 'var(--text-light)',
            border: 'none',
            borderRadius: '5px',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '0.5rem',
            display: 'block',
            margin: '0.5rem auto 0 auto'
          }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >View Details</button>
    </div>
   </div>
   </Link>
  )
}

export default Product
