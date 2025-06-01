import React from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const increaseQuantity = () => {
    const newQty = item.quantity + 1;
    dispatch(addItemsToCart({ id: item.product, quantity: newQty }));
  };
  const decreaseQuantity = () => {
    const newQty = item.quantity - 1;
    if (newQty < 1) return;
    dispatch(addItemsToCart({ id: item.product, quantity: newQty }));
  };
  const removeItem = () => {
    dispatch(removeItemFromCart(item.product));
  };
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr] items-center gap-4 p-4 border-b border-[#eee] md:grid-cols-1 md:p-3">
      {/* Product Info */}
      <div className="flex items-center gap-4 md:mb-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md shadow"
        />
        <div>
          <div className="font-semibold text-[#1a1a1a]">{item.name}</div>
          <div className="text-[#777] text-sm">Price: {item.price}/-</div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 md:w-full md:justify-between">
        <button
          onClick={decreaseQuantity}
          className="px-3 py-2 rounded bg-[#f1f3f5] text-[#333] font-semibold hover:bg-[#e9ecef]"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          readOnly
          className="w-14 text-center border border-[#ddd] rounded py-2"
        />
        <button
          onClick={increaseQuantity}
          className="px-3 py-2 rounded bg-[#f1f3f5] text-[#333] font-semibold hover:bg-[#e9ecef]"
        >
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="text-center font-semibold text-[#1a1a1a] md:text-left">
        {item.price * item.quantity}/-
      </div>

      {/* Actions */}
      <div className="flex justify-center md:justify-start">
        <button
          onClick={removeItem}
          className="px-4 py-2 rounded bg-[var(--primary-dark)] text-white font-semibold hover:bg-[var(--bg-primary)]"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
