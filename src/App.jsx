import { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent';
import Footer from './components/Footer'
import Hero from './components/Hero';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="bg-background min-h-screen">
      <Header cartCount={cartCount} />
      <Hero />
      <MainContent onAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
}