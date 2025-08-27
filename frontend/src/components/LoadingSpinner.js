import React from 'react';
import { CircuitBoard } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-4">
      <CircuitBoard className="w-12 h-12 text-primary-500 animate-spin" />
      <p className="text-gray-600 dark:text-gray-300 font-medium">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
