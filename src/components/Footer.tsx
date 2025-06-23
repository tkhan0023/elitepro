
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-semibold mb-3">Company</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold mb-3">Help</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold mb-3">Policies</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-semibold mb-3">Connect</h5>
          <div className="flex space-x-3 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-blue-400 rounded"></div>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <div className="w-6 h-6 bg-pink-600 rounded"></div>
            </a>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 mb-2">Download our app</p>
            <div className="flex space-x-2">
              <div className="h-10 w-28 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                <span className="text-xs text-white">App Store</span>
              </div>
              <div className="h-10 w-28 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                <span className="text-xs text-white">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 border-t border-gray-700 pt-8 text-center">
        <p className="text-sm text-gray-400">© 2024 AJIO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
