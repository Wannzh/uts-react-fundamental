import { useState, useEffect } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent';
import Footer from './components/Footer'
import Hero from './components/Hero';
import CartDrawer from './components/CartDrawer';
import Support from './components/Support';

export default function App() {
  // Persist cart items as { [productId]: quantity }
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const cartCount = Object.values(cartItems).reduce((s, v) => s + v, 0);
  const [showCart, setShowCart] = useState(false);
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [route, setRoute] = useState('home'); // 'home' or 'support'

  // Accept productId and delta (positive = add, negative = remove)
  const handleAddToCart = (productId, delta = 1) => {
    setCartItems(prev => {
      const prevQty = prev[productId] || 0;
      const nextQty = Math.max(0, prevQty + delta);
      const next = { ...prev };
      if (nextQty === 0) delete next[productId];
      else next[productId] = nextQty;
      return next;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const toggleCart = (open) => {
    if (typeof open === 'boolean') setShowCart(open);
    else setShowCart(s => !s);
  };

  const handleCategoryChange = (category) => {
    // "Store" or null means show all
    if (!category || category === 'Store') setSelectedCategory(null);
    else setSelectedCategory(category);
    // keep existing search when changing category
    // ensure we're on the main route when selecting a category
    setRoute('home');
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleNavigate = (to) => {
    // simple in-app routing
    if (to === 'support') setRoute('support');
    else setRoute('home');
  };

  const handleAddComment = (phoneId, comment) => {
    const existingComments = comments[phoneId] || [];
    setComments({
      ...comments,
      [phoneId]: [...existingComments, comment],
    });
  };

  const handleDeleteComment = (phoneId, commentIndex) => {
    const phoneComments = comments[phoneId] || [];
    const updatedComments = phoneComments.filter((_, index) => index !== commentIndex);
    setComments({
      ...comments,
      [phoneId]: updatedComments,
    });
  };
  return (
    <div className="bg-background min-h-screen">
      <Header 
        cartCount={cartCount}
        onToggleCart={toggleCart}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        onSearchChange={handleSearchChange}
        onNavigate={handleNavigate}
      />
      {route === 'support' ? (
        <Support />
      ) : (
        <>
          <Hero />
          <MainContent 
            onAddToCart={handleAddToCart}
            comments={comments}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            cartItems={cartItems}
          />
        </>
      )}
      <Footer />
      <CartDrawer
        open={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        onChangeQuantity={handleAddToCart}
      />
    </div>
  );
}