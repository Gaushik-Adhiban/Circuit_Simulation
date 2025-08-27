import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '1rem' }}>
          Welcome to CircuitGen
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
          Design, simulate, and share electronic circuits with our intuitive drag-and-drop interface.
          Perfect for students, educators, and electronics enthusiasts.
        </p>
      </div>

      <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <h3>🎨 Visual Design</h3>
          <p>
            Drag and drop components onto the canvas to build your circuits visually.
            No complex syntax or coding required.
          </p>
        </div>
        <div className="card">
          <h3>⚡ Real-time Simulation</h3>
          <p>
            See your circuits come to life with real-time electrical simulation.
            Analyze voltage, current, and power consumption.
          </p>
        </div>
        <div className="card">
          <h3>📚 Component Library</h3>
          <p>
            Access a comprehensive library of electronic components including
            resistors, capacitors, LEDs, Arduino, and more.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Link to="/editor" className="btn btn-primary" style={{ 
          fontSize: '1.2rem', 
          padding: '1rem 2rem',
          textDecoration: 'none',
          display: 'inline-block',
          marginRight: '1rem'
        }}>
          Start Designing
        </Link>
        <Link to="/circuits" className="btn btn-secondary" style={{ 
          fontSize: '1.2rem', 
          padding: '1rem 2rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Browse Circuits
        </Link>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3>🚀 Getting Started</h3>
        <ol style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Click "Start Designing" to open the circuit editor</li>
          <li>Drag components from the palette onto the canvas</li>
          <li>Connect components by clicking and dragging between pins</li>
          <li>Use the simulation panel to analyze your circuit</li>
          <li>Save your work and share with others</li>
        </ol>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
        <h3>Ready to build something amazing?</h3>
        <p>Join thousands of makers, students, and engineers using CircuitGen to bring their ideas to life.</p>
        <Link to="/editor" className="btn btn-success" style={{ 
          fontSize: '1.1rem', 
          padding: '0.8rem 1.5rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Create Your First Circuit
        </Link>
      </div>
    </div>
  );
};

export default Home;
