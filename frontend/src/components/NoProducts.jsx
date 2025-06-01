import React from 'react';

function NoProducts({keyword}) {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center p-8 text-center">
      <div className="text-3xl text-[#666] mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-[#333] mb-2">No Products Found</h3>
      <p className="text-[#666] max-w-[400px]">
        {keyword?`We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.`:'No products are available. Please check back later'}
      </p>
    </div>
  )
}

export default NoProducts
