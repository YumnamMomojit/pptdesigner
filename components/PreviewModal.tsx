import React from 'react';
import type { Template } from '../types';

interface PreviewModalProps {
  template: Template;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ template, onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true"></div>
      
      <div 
        className="relative w-full max-w-4xl bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h2 id="preview-modal-title" className="text-lg font-bold text-white">{template.name}</h2>
            <button 
                onClick={onClose}
                aria-label="Close preview"
                className="text-slate-400 hover:text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <img
            src={template.previewImageUrl.replace('w=400&h=225', 'w=1280&h=720')}
            alt={`Preview of ${template.name}`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
