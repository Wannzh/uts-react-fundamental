import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { handphoneData } from '../json/dataHp';

const CartItem = ({ itemId, qty, onChange }) => {
  const phone = handphoneData.find(p => p.id === Number(itemId));
  if (!phone) return null;
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <img src={phone.image} alt={phone.name} className="w-12 h-12 object-contain rounded-md" />
        <div>
          <div className="font-semibold text-slate-900">{phone.name}</div>
          <div className="text-sm text-slate-600">${phone.price}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(itemId, -1)} className="p-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300"><Minus size={14} /></button>
        <div className="px-3 font-medium text-slate-900">{qty}</div>
        <button onClick={() => onChange(itemId, +1)} className="p-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300"><Plus size={14} /></button>
      </div>
    </div>
  );
};

const CartDrawer = ({ open, onClose, cartItems, onChangeQuantity }) => {
  const items = Object.entries(cartItems || {});
  const total = items.reduce((s, [id, qty]) => {
    const p = handphoneData.find(x => x.id === Number(id));
    return s + (p ? p.price * qty : 0);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          className="fixed top-0 right-0 h-full w-80 bg-slate-50 shadow-2xl z-50 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-slate-900">Your Cart</h3>
            <button onClick={onClose} className="text-slate-600 hover:text-slate-900"><X /></button>
          </div>

          <div className="overflow-y-auto h-[70%]">
            {items.length === 0 ? (
              <div className="text-center text-slate-600 mt-8">Your cart is empty</div>
            ) : (
              items.map(([id, qty]) => (
                <CartItem key={id} itemId={id} qty={qty} onChange={onChangeQuantity} />
              ))
            )}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between font-semibold text-slate-900">Total <span>${total}</span></div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">Checkout</button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
