import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sun, Moon, Save, Play, Square, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import ComponentPalette from '../components/ComponentPalette';
import CircuitCanvas from '../components/CircuitCanvas';
import PropertiesPanel from '../components/PropertiesPanel';
import { useTheme } from '../context/ThemeContext';
import { getCircuit, saveCircuit, runSimulation } from '../services/api';

const CircuitEditor = () => {
  const { id } = useParams();
  const { isDarkMode, toggleTheme } = useTheme();
  const [circuit, setCircuit] = useState({
    name: 'Untitled Circuit',
    description: '',
    components: [],
    connections: [],
    metadata: {}
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadCircuit(id);
    }
  }, [id]);

  const loadCircuit = async (circuitId) => {
    try {
      setLoading(true);
      const data = await getCircuit(circuitId);
      setCircuit(data);
    } catch (err) {
      console.error('Error loading circuit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const savedCircuit = await saveCircuit(circuit);
      setCircuit(savedCircuit);
      // Show success message
    } catch (err) {
      console.error('Error saving circuit:', err);
      // Show error message
    } finally {
      setSaving(false);
    }
  };

  const handleSimulate = async () => {
    try {
      setLoading(true);
      const results = await runSimulation({
        components: circuit.components,
        connections: circuit.connections,
        simulation_time: 1.0,
        time_step: 0.001
      });
      setSimulationResults(results);
    } catch (err) {
      console.error('Error running simulation:', err);
    } finally {
      setLoading(false);
    }
  };

  const addComponent = (componentType) => {
    const newComponent = {
      id: `comp_${Date.now()}`,
      type: componentType,
      name: `${componentType}_${circuit.components.length + 1}`,
      position: { x: 100, y: 100 },
      rotation: 0,
      properties: getDefaultProperties(componentType)
    };

    setCircuit(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  const updateComponent = (componentId, updates) => {
    setCircuit(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === componentId ? { ...comp, ...updates } : comp
      )
    }));
  };

  const deleteComponent = (componentId) => {
    setCircuit(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== componentId),
      connections: prev.connections.filter(conn =>
        conn.from_component !== componentId && conn.to_component !== componentId
      )
    }));
    
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  };

  const addConnection = (connection) => {
    setCircuit(prev => ({
      ...prev,
      connections: [...prev.connections, {
        id: `conn_${Date.now()}`,
        ...connection,
        wire_points: []
      }]
    }));
  };

  const getDefaultProperties = (componentType) => {
    const defaults = {
      resistor: { resistance: 1000, tolerance: 5 },
      capacitor: { capacitance: 0.000001, voltage_rating: 25 },
      led: { forward_voltage: 2.0, forward_current: 0.02, color: 'red' },
      battery: { voltage: 9.0, capacity: 1000 },
      switch: { state: 'open' },
      arduino: { model: 'uno' }
    };
    return defaults[componentType] || {};
  };

  if (loading && !circuit.components.length) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={circuit.name}
                onChange={(e) => setCircuit(prev => ({ ...prev, name: e.target.value }))}
                className="px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 
                         dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 outline-none
                         text-lg font-medium transition-all duration-200"
                placeholder="Circuit Name"
              />
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="btn btn-secondary p-2"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSimulate}
                disabled={loading}
                className="btn btn-secondary flex items-center space-x-2"
              >
                {loading ? (
                  <RotateCcw className="animate-spin" size={20} />
                ) : (
                  <>
                    <Play size={20} />
                    <span>Simulate</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={saving}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save size={20} />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64"
          >
            <ComponentPalette onAddComponent={addComponent} />
          </motion.div>

          <motion.div 
            className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-component overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <CircuitCanvas
              components={circuit.components}
              connections={circuit.connections}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              onUpdateComponent={updateComponent}
              onDeleteComponent={deleteComponent}
              onAddConnection={addConnection}
              simulationResults={simulationResults}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedComponent && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="w-80"
              >
                <PropertiesPanel
                  selectedComponent={selectedComponent}
                  onUpdateComponent={updateComponent}
                  simulationResults={simulationResults}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CircuitEditor;
