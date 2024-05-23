import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Header = () => {
  const { currentUser } = useSelector(state => state.user); 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get('searchTerm');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-md py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-3">
        <Link to="/">
          <h1 className="font-bold text-xl flex items-center space-x-1">
            <span className="text-blue-600">GharDekho</span>
            <span className="text-gray-800">.com</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-2 rounded-full flex items-center shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2">
            <FaSearch className="text-gray-600" />
          </button>
        </form>
        <ul className="flex items-center space-x-6">
          <li className="hidden sm:block">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          </li>
          <li className="hidden sm:block">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center space-x-2">
              {currentUser ? (
                <img
                  className="rounded-full h-8 w-8 object-cover border-2 border-blue-600"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <span className="text-gray-700 hover:text-blue-600 transition">Sign in</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
