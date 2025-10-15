import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-12">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Mobile Store</h3>
            <p className="text-sm">Your one-stop destination for the latest mobile technology and accessories.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-teal-400 transition-colors"><Instagram size={20} /></a>
              <a href="https://github.com/Wannzh" className="hover:text-teal-400 transition-colors"><Github size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mobile Store. Designed by Alwan for UTS React Fundamental.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;