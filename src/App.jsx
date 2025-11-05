import { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent';
import Footer from './components/Footer'
import Hero from './components/Hero';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Accept productId and delta (positive = add, negative = remove)
  const handleAddToCart = (productId, delta = 1) => {
    setCartCount(prevCount => Math.max(0, prevCount + delta));
  };

  const handleCategoryChange = (category) => {
    // "Store" or null means show all
    if (!category || category === 'Store') setSelectedCategory(null);
    else setSelectedCategory(category);
    // keep existing search when changing category
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
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
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        onSearchChange={handleSearchChange}
      />
      <Hero />
      <MainContent 
        onAddToCart={handleAddToCart}
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
      />
      <Footer />
    </div>
  );
}