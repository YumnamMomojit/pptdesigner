import React from 'react';
import type { Template } from '../types';
import { EyeIcon } from './icons';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, onPreview }) => {
  const selectedClasses = 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-800';
  
  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview();
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer group relative flex-shrink-0 w-64 bg-slate-700 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${isSelected ? selectedClasses : ''}`}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${template.name} template`}
    >
      <img src={template.previewImageUrl} alt={template.name} className="w-full h-36 object-cover" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={handlePreviewClick}
          className="bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold py-2 px-4 rounded-full flex items-center text-sm backdrop-blur-sm"
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          Preview
        </button>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-white truncate">{template.name}</h4>
        <p className="text-xs text-slate-400 mt-1 h-8 overflow-hidden">{template.description}</p>
      </div>
    </div>
  );
};


interface TemplateGalleryProps {
  templates: Template[];
  selectedTemplate?: Template;
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates, selectedTemplate, onSelectTemplate, onPreviewTemplate }) => {
  const groupedTemplates = templates.reduce((acc, template) => {
    (acc[template.category] = acc[template.category] || []).push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
        <div key={category}>
          <h3 className="text-md font-semibold text-slate-400 mb-3">{category}</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
            {categoryTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={() => onSelectTemplate(template)}
                onPreview={() => onPreviewTemplate(template)}
              />
            ))}
             <div className="flex-shrink-0 w-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
};