import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCircuits, deleteCircuit } from '../services/api';

const CircuitList = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCircuits();
  }, []);

  const loadCircuits = async () => {
    try {
      setLoading(true);
      const data = await getCircuits();
      setCircuits(data);
    } catch (err) {
      setError('Failed to load circuits');
      console.error('Error loading circuits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (circuitId) => {
    if (window.confirm('Are you sure you want to delete this circuit?')) {
      try {
        await deleteCircuit(circuitId);
        setCircuits(circuits.filter(circuit => circuit.id !== circuitId));
      } catch (err) {
        setError('Failed to delete circuit');
        console.error('Error deleting circuit:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ color: '#e74c3c' }}>Error</h3>
          <p>{error}</p>
          <button onClick={loadCircuits} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Circuits</h1>
        <Link to="/editor" className="btn btn-primary">
          New Circuit
        </Link>
      </div>

      {circuits.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No circuits yet</h3>
          <p>Create your first circuit to get started!</p>
          <Link to="/editor" className="btn btn-primary">
            Create Circuit
          </Link>
        </div>
      ) : (
        <div className="grid grid-2">
          {circuits.map(circuit => (
            <div key={circuit.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, flex: 1 }}>{circuit.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link 
                    to={`/editor/${circuit.id}`} 
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.3rem 0.8rem' }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(circuit.id)}
                    className="btn btn-danger"
                    style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {circuit.description && (
                <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
                  {circuit.description}
                </p>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#95a5a6' }}>
                <span>
                  {circuit.components?.length || 0} components
                </span>
                <span>
                  {circuit.is_public ? 'Public' : 'Private'}
                </span>
                <span>
                  {new Date(circuit.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CircuitList;
