import React from 'react'

function CheckoutPath({active, activePath}) {
  const steps=[
    {key:'shipping', label:'Shipping'},
    {key:'confirm', label:'Confirm Order'},
    {key:'payment', label:'Payment'},
  ]
  let activeIndex = steps.findIndex(s=>s.key===active)
  if (activeIndex < 0 && typeof activePath === 'number') {
    activeIndex = Math.max(0, Math.min(steps.length - 1, activePath))
  }
  return (
    <div className="max-w-[800px] mx-auto mt-10 px-4">
      <div className="relative flex items-center justify-between">
        {/* connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#e5e7eb] -translate-y-1/2"></div>
        {steps.map((step,idx)=>{
          const isActive=idx<=activeIndex
          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isActive? 'bg-[var(--primary-dark)] border-[var(--primary-dark)] text-white' : 'bg-white border-[#d1d5db] text-[#6b7280]'}`}>
                {idx+1}
              </div>
              <span className={`mt-2 text-sm ${isActive? 'text-[var(--primary-dark)] font-semibold' : 'text-[#6b7280]'}`}>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckoutPath
