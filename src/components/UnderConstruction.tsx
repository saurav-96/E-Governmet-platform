import React from 'react';
import { Wrench } from 'lucide-react';

export const UnderConstruction: React.FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6 shadow-custom border border-border">
        <Wrench size={32} className="text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 capitalize">{pageName} Module</h2>
      <p className="text-textSecondary max-w-md">
        This functional module is currently undergoing AI integration and optimization. 
        It will be deployed in the upcoming system update.
      </p>
    </div>
  );
};
