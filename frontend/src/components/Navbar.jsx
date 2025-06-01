import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [logoHover, setLogoHover] = useState(false);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchQuery('');
  };

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'var(--bg-primary)', boxShadow: 'var(--shadow-sm)', zIndex: 1000 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            style={{ fontSize: '1.5rem', fontWeight: 700, color: logoHover ? 'var(--primary-main)' : 'var(--primary-light)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          >
            ShopEasy
          </Link>
        </div>

        <div
          style={{
            flex: 1,
            marginLeft: '2rem',
            ...(isMobile
              ? {
                  display: isMenuOpen ? 'block' : 'none',
                  position: 'absolute',
                  top: '4rem',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--bg-primary)',
                  padding: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)',
                }
              : {}),
            transition: 'all 0.3s ease',
          }}
        >
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: isMobile ? '1rem' : '2.5rem',
              margin: 0,
              padding: 0,
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <li onClick={() => setIsMenuOpen(false)}>
              <Link
                to="/"
                onMouseEnter={() => setHoveredLinkIndex(0)}
                onMouseLeave={() => setHoveredLinkIndex(null)}
                style={{ color: hoveredLinkIndex === 0 ? 'var(--primary-light)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onMouseEnter={() => setHoveredLinkIndex(1)}
                onMouseLeave={() => setHoveredLinkIndex(null)}
                style={{ color: hoveredLinkIndex === 1 ? 'var(--primary-light)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onMouseEnter={() => setHoveredLinkIndex(2)}
                onMouseLeave={() => setHoveredLinkIndex(null)}
                style={{ color: hoveredLinkIndex === 2 ? 'var(--primary-light)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onMouseEnter={() => setHoveredLinkIndex(3)}
                onMouseLeave={() => setHoveredLinkIndex(null)}
                style={{ color: hoveredLinkIndex === 3 ? 'var(--primary-light)' : 'var(--text-primary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1.25rem' : '1.5rem', width: isMobile ? '300px' : '250px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', transition: 'width 0.3s ease' }}>
              <input
                type="text"
                placeholder="Search products.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: isSearchOpen ? '100px' : '0',
                  opacity: isSearchOpen ? 1 : 0,
                  padding: '5px',
                  border: 'none',
                  borderRadius: '5px',
                  outline: 'none',
                  transition: 'width 0.3s ease, opacity 0.3s ease',
                }}
              />
              <button
                type="button"
                onClick={toggleSearch}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', outline: 'none' }}
              >
                <SearchIcon
                   style={{ color: hoveredIcon === 'search' ? 'var(--primary-light)' : 'var(--text-light)', fontSize: '1.5rem' }}
                   onMouseEnter={() => setHoveredIcon('search')}
                   onMouseLeave={() => setHoveredIcon(null)}
                   focusable="false"
                />
              </button>
            </form>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <ShoppingCartIcon
                  style={{ color: hoveredIcon === 'cart' ? 'var(--primary-light)' : 'var(--text-primary)', transition: 'color 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIcon('cart')}
                  onMouseLeave={() => setHoveredIcon(null)}
               />
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--primary-main)',
                  color: 'var(--text-light)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  minWidth: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 0.25rem',
                }}
              >
                {cartItems.length}
              </span>
            </Link>
          </div>

          {!isAuthenticated && (
            <Link to="/register" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <PersonAddIcon
                  style={{ color: hoveredIcon === 'register' ? 'var(--primary-light)' : 'var(--text-primary)', transition: 'color 0.2s ease', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredIcon('register')}
                  onMouseLeave={() => setHoveredIcon(null)}
               />
            </Link>
          )}

          <div onClick={toggleMenu} style={{ display: isMobile ? 'block' : 'none', cursor: 'pointer', marginLeft: '1rem' }}>
            {isMenuOpen ? (
              <CloseIcon
                  style={{ color: hoveredIcon === 'hamburger' ? 'var(--primary-light)' : 'var(--text-primary)' }}
                  onMouseEnter={() => setHoveredIcon('hamburger')}
                  onMouseLeave={() => setHoveredIcon(null)}
               />
            ) : (
              <MenuIcon
                  style={{ color: hoveredIcon === 'hamburger' ? 'var(--primary-light)' : 'var(--text-primary)' }}
                  onMouseEnter={() => setHoveredIcon('hamburger')}
                  onMouseLeave={() => setHoveredIcon(null)}
               />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
