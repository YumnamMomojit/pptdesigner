import React from 'react';
import type { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  const selectedClasses = 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-800';
  
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer group flex-shrink-0 w-64 bg-slate-700 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 ${isSelected ? selectedClasses : ''}`}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Select ${template.name} template`}
    >
      <img src={template.previewImageUrl} alt={template.name} className="w-full h-36 object-cover" />
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
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates, selectedTemplate, onSelectTemplate }) => {
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
              />
            ))}
             <div className="flex-shrink-0 w-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
};