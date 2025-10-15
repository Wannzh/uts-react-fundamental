import { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent';
import Footer from './components/Footer'
import Hero from './components/Hero';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [comments, setComments] = useState({});

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
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
      <Header cartCount={cartCount} />
      <Hero />
      <MainContent onAddToCart={handleAddToCart}
        comments={comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment} />
      <Footer />
    </div>
  );
}