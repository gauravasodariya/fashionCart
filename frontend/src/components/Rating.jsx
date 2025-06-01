import React, { useState } from 'react';

function Rating({value,onRatingChange,disabled}) {
    const [hoveredRating,setHoveredRating]=useState(0);
    const [selectedRating,setSelectedRating]=useState(value ||0);
    const [starHover, setStarHover] = useState({});

    // Handle star hover
    const handleMouseEnter=(rating)=>{
        if(!disabled){
            setHoveredRating(rating);
            setStarHover(prev => ({...prev, [rating]: true}));
        }
    }

    // Mouse Leave
    const handleMouseLeave=()=>{
        if(!disabled){
            setHoveredRating(0);
            setStarHover({});
        }
    }

    // Handle click
    const handleClick=(rating)=>{
        if(!disabled){
            setSelectedRating(rating)
            if(onRatingChange){
                onRatingChange(rating)
            }
        }
        
    }

    // Function to generate stars based on the selected rating
    const generateStars=()=>{
        const stars=[];
        for(let i=1;i<=5;i++){
            const isFilled=i<=(hoveredRating ||selectedRating);
            const isHovered = starHover[i];
            stars.push(
                <span
                key={i}
                onMouseEnter={()=>handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={()=>handleClick(i)}
                style={{
                    fontSize: '1.5rem',
                    cursor: disabled ? 'default' : 'pointer',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    color: isFilled ? 'var(--primary-main)' : 'var(--text-secondary)',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                    pointerEvents: disabled ? 'none' : 'auto'
                }}
                >★</span>
            )
        }
        return stars;

    }
  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center'}}> {generateStars()}</div>
    </div>
  )
}

export default Rating
