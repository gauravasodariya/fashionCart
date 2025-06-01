import React, { useEffect, useState } from 'react';
const images = [
  '/images/banner1.png',
  '/images/banner2.png',
  '/images/banner3.png',
  '/images/banner4.png',
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-[450px] overflow-hidden mt-24">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="min-w-full h-full" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[450px] object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider
