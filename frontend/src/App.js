import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

// Import components
import Header from './components/Header';
import CircuitEditor from './pages/CircuitEditor';
import CircuitList from './pages/CircuitList';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="main-content container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/circuits" element={<CircuitList />} />
              <Route path="/editor" element={<CircuitEditor />} />
              <Route path="/editor/:id" element={<CircuitEditor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
