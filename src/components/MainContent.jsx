import React, { useState } from 'react';
import { handphoneData } from '../json/dataHp';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, MessageSquare, X, Trash2,
    LayoutDashboard, Zap, Compass, Star, Settings, Tag, ShoppingBag, CheckCircle 
} from 'lucide-react';

// --- Komponen Sidebar ---
const Sidebar = () => {
    const categories = [{ name: 'All iPhones', icon: LayoutDashboard }, { name: 'For Sale', icon: Tag }, { name: 'Music & TV', icon: Zap }, { name: 'Accessories', icon: Compass }, { name: 'New Arrival', icon: Star }, { name: 'Offers', icon: Settings },];
    return (<aside className="w-full md:w-64 self-start"> <div className="bg-gray-50/80 border border-gray-200/80 rounded-2xl p-6"> <h3 className="font-semibold text-lg mb-4 text-slate-800">Categories</h3> <ul className="space-y-3"> {categories.map((cat, index) => (<li key={index}> <a href="#" className={`flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-colors ${index === 0 ? 'font-semibold text-slate-900' : ''}`}> <cat.icon size={20} /> <span>{cat.name}</span> </a> </li>))} </ul> </div> </aside>);
};

// --- Komponen Kartu Produk ---
const ProductCard = ({ phone, onLike, onComment, onDetails, onAddToCart, isLiked }) => (<motion.div className="bg-gray-50/50 hover:bg-white transition-colors duration-300 border border-gray-200/80 rounded-3xl p-6 flex flex-col text-center items-center shadow-sm hover:shadow-xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}> <img src={phone.image} alt={phone.name} className="w-full h-48 object-contain" /> <h3 className="text-xl font-semibold text-slate-900 mt-4">{phone.name}</h3> <p className="text-slate-600 text-sm mt-1 h-10">{phone.description.substring(0, 50)}...</p> <p className="text-lg text-slate-900 font-semibold my-4">${phone.price}</p> <div className="flex justify-center items-center space-x-4 mb-4"> <motion.button onClick={onLike} whileTap={{ scale: 0.9 }}><Heart size={20} className={`transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-slate-500 hover:text-slate-900'}`} /></motion.button> <motion.button onClick={onComment} whileTap={{ scale: 0.9 }}><MessageSquare size={20} className="text-slate-500 hover:text-slate-900 transition-colors" /></motion.button> </div> <motion.button onClick={onAddToCart} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-sm hover:bg-blue-500 transition-colors" whileTap={{ scale: 0.95 }}>Add to Cart</motion.button> <button onClick={onDetails} className="text-blue-600 text-sm mt-3 hover:underline">Learn more &gt;</button> </motion.div>);

// --- Komponen Modal ---
const AppleModal = ({ onClose, children }) => (<motion.div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> <motion.div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl p-8 max-w-2xl w-full relative" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}> <motion.button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black" whileTap={{ scale: 0.9 }}><X size={24} /></motion.button> {children} </motion.div> </motion.div>);
const InfoModal = ({ phone, onClose }) => (<AppleModal onClose={onClose}> <div className="flex flex-col md:flex-row gap-8"> <img src={phone.image} alt={phone.name} className="w-full md:w-1/2 h-64 object-contain rounded-lg" /> <div className="flex-1"> <h2 className="text-3xl font-bold text-slate-900 mb-2">{phone.name}</h2> <p className="text-slate-600 mb-4">{phone.brand} - {phone.category}</p> <p className="text-3xl font-semibold text-slate-900 mb-4">${phone.price}</p> <p className="text-slate-700">{phone.description}</p> </div> </div> </AppleModal>);

const ToastNotification = ({ message, icon }) => (
    <motion.div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 bg-slate-800 text-white rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
        {icon}
        <span>{message}</span>
    </motion.div>
);

const CommentModal = ({ phone, onClose, existingComments, onAddComment, onDeleteComment }) => { // <-- Terima prop onDeleteComment
    const [newComment, setNewComment] = useState('');
    const handleSubmit = () => {
        if (newComment.trim() === '') return;
        onAddComment(phone.id, newComment);
        setNewComment('');
    };
    return (
        <AppleModal onClose={onClose}>
            <h3 className="text-2xl font-semibold mb-4 text-slate-900">Comments for {phone.name}</h3>
            <div className="mb-4 max-h-40 overflow-y-auto space-y-2 pr-2">
                {existingComments.length > 0 ? (
                    existingComments.map((comment, index) => (
                        // Setiap komentar sekarang memiliki tombol hapus
                        <div key={index} className="bg-slate-100 rounded-lg p-3 text-sm text-slate-800 flex justify-between items-center group">
                            <span>{comment}</span>
                            <button
                                onClick={() => onDeleteComment(phone.id, index)} // <-- Panggil fungsi hapus
                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                ) : <p className="text-sm text-slate-500">No comments yet.</p>}
            </div>
            <textarea className="w-full h-24 p-3 bg-slate-100 text-slate-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            <div className="flex justify-end mt-4">
                <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-500 transition-colors">Submit</button>
            </div>
        </AppleModal>
    );
};


const MainContent = ({ onAddToCart, comments, onAddComment, onDeleteComment }) => {
    // State
    const [likedItems, setLikedItems] = useState({});
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(null);

    const [toast, setToast] = useState({ show: false, message: '', icon: null });

    const showToast = (message, icon) => {
        setToast({ show: true, message, icon });
        setTimeout(() => {
            setToast({ show: false, message: '', icon: null });
        }, 3000); // Sembunyikan setelah 3 detik
    };

    const handleLike = (id) => {
        const isNowLiked = !likedItems[id];
        setLikedItems(prev => ({ ...prev, [id]: isNowLiked }));
        showToast(
            isNowLiked ? 'Added to favorites!' : 'Removed from favorites',
            <Heart size={20} className={isNowLiked ? 'text-red-500' : 'text-white'} />
        );
    };

    const handleAddToCartWithToast = () => {
        onAddToCart(); // Tetap jalankan fungsi asli dari App.jsx
        showToast('Added to cart!', <ShoppingBag size={20} />);
    };

    const handleAddCommentWithToast = (phoneId, comment) => {
        onAddComment(phoneId, comment);
        showToast('Comment added!', <CheckCircle size={20} className="text-green-500" />);
    };

    const handleDeleteCommentWithToast = (phoneId, commentIndex) => {
        onDeleteComment(phoneId, commentIndex);
        showToast('Comment deleted', <Trash2 size={20} className="text-red-500" />);
    };

    return (
        <main className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900">Choose your new iPhone.</h2>
                    <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">With powerful features and a stunning design, there’s an iPhone that’s right for you.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 mt-16">
                    <Sidebar />
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {handphoneData.map(phone => (
                                <ProductCard
                                    key={phone.id}
                                    phone={phone}
                                    onLike={() => handleLike(phone.id)}
                                    onComment={() => setShowCommentModal(phone)}
                                    onDetails={() => setSelectedPhone(phone)}
                                    onAddToCart={handleAddToCartWithToast}
                                    isLiked={!!likedItems[phone.id]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedPhone && <InfoModal phone={selectedPhone} onClose={() => setSelectedPhone(null)} />}
                {showCommentModal && (
                    <CommentModal
                        phone={showCommentModal}
                        onClose={() => setShowCommentModal(null)}
                        existingComments={comments[showCommentModal.id] || []}
                        onAddComment={handleAddCommentWithToast}
                        onDeleteComment={handleDeleteCommentWithToast}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toast.show && <ToastNotification message={toast.message} icon={toast.icon} />}
            </AnimatePresence>
        </main>
    );
};

export default MainContent;