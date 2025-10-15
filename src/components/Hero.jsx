import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center -mt-11">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-semibold text-xl text-orange-500">New</p>
        <h1 className="text-5xl md:text-7xl font-bold mt-2">iPhone 17 Pro</h1>
        <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gray-300">The Ultimate iPhone.</h2>
        <p className="text-lg text-gray-500 mt-2">From $999 or $41.62/mo. for 24 mo.*</p>
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.5, type: 'spring' }}
      >
        <img 
          src="https://www.apple.com/v/iphone-15-pro/c/images/meta/iphone-15-pro_overview__f8jz7aagka2q_og.png" // Ganti dengan gambar produk resolusi tinggi
          alt="iPhone 17 Pro"
          className="w-auto h-[40vh] md:h-[50vh]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;