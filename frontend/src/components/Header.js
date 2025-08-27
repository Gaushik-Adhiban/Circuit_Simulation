import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Circuit } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Circuit size={32} className="text-primary-500" />
              <span className="font-heading text-xl font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Circuit Gen
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="font-medium text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/circuits" 
                className="font-medium text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 transition-colors"
              >
                My Circuits
              </Link>
              <Link 
                to="/editor" 
                className="inline-flex items-center px-4 py-2 rounded-2xl bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                New Circuit
              </Link>
            </nav>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-2xl text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
  );
};

export default Header;
