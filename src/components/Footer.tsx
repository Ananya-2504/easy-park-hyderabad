
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-parking-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Easy Park & Pay</h3>
            <p className="mb-4">Find and book parking spaces easily in Hyderabad.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-parking-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="hover:text-parking-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-parking-blue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-parking-blue">Home</Link></li>
              <li><Link to="/find-parking" className="hover:text-parking-blue">Find Parking</Link></li>
              <li><Link to="/services" className="hover:text-parking-blue">Services</Link></li>
              <li><Link to="/subscriptions" className="hover:text-parking-blue">Subscriptions</Link></li>
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-parking-blue">FAQs</a></li>
              <li><a href="#" className="hover:text-parking-blue">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-parking-blue">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-parking-blue">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">123 Parking Avenue</p>
              <p className="mb-2">Hyderabad, Telangana 500081</p>
              <p className="mb-2">Phone: <a href="tel:+919876543210" className="hover:text-parking-blue">+91 9876543210</a></p>
              <p>Email: <a href="mailto:info@easyparkpay.com" className="hover:text-parking-blue">info@easyparkpay.com</a></p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center">© {new Date().getFullYear()} Easy Park & Pay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
