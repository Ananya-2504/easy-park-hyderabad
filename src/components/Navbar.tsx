
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-parking-blue">Easy Park & Pay</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:space-x-4">
            <Link to="/" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
              Home
            </Link>
            <Link to="/find-parking" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
              Find Parking
            </Link>
            <Link to="/services" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
              Services
            </Link>
            <Link to="/subscriptions" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
              Subscriptions
            </Link>
            <Link to="/valet-registration" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
              Valet Registration
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 text-parking-dark hover:text-parking-blue">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="px-3 py-2 text-parking-dark hover:text-parking-blue">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin} className="bg-parking-blue hover:bg-blue-500 text-white">
                Login
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-parking-blue">
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link to="/" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/find-parking" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
            Find Parking
          </Link>
          <Link to="/services" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
            Services
          </Link>
          <Link to="/subscriptions" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
            Subscriptions
          </Link>
          <Link to="/valet-registration" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
            Valet Registration
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 text-parking-dark hover:text-parking-blue" onClick={toggleMenu}>
                Dashboard
              </Link>
              <button onClick={() => { handleLogout(); toggleMenu(); }} className="block w-full text-left px-3 py-2 text-parking-dark hover:text-parking-blue">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => { handleLogin(); toggleMenu(); }} className="block w-full text-left px-3 py-2 bg-parking-blue hover:bg-blue-500 text-white rounded">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
