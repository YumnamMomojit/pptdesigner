import React, { useState } from 'react';
import type { GenerationConfig, Template } from '../types';
import { MagicWandIcon, LayoutTemplateIcon } from './icons';
import { TemplateGallery } from './TemplateGallery';
import { PreviewModal } from './PreviewModal';
import { templates as templatesData } from '../data/templates';

interface PresentationGeneratorProps {
  onGenerate: (config: GenerationConfig) => void;
}

export const PresentationGenerator: React.FC<PresentationGeneratorProps> = ({ onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [slidesCount, setSlidesCount] = useState(8);
  const [includeImages, setIncludeImages] = useState(true);
  const [includeVideo, setIncludeVideo] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | undefined>(templatesData[0]);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate({ topic, slidesCount, includeImages, includeVideo, template: selectedTemplate });
    }
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };


  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
              AI Presentation Pro
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Turn your ideas into stunning presentations in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-2">
                1. What is your presentation about?
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The Future of Renewable Energy"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                  <label htmlFor="slidesCount" className="block text-sm font-medium text-slate-300 mb-2">
                  2. Number of slides ({slidesCount})
                  </label>
                  <input
                  id="slidesCount"
                  type="range"
                  min="3"
                  max="15"
                  value={slidesCount}
                  onChange={(e) => setSlidesCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
              </div>

              <div className="flex items-center justify-center pt-5">
                <div className="flex items-center">
                  <input
                    id="includeImages"
                    type="checkbox"
                    checked={includeImages}
                    onChange={(e) => setIncludeImages(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="includeImages" className="ml-2 block text-sm text-slate-300">
                    Generate AI Images
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-center pt-5">
                <div className="flex items-center">
                  <input
                    id="includeVideo"
                    type="checkbox"
                    checked={includeVideo}
                    onChange={(e) => setIncludeVideo(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="includeVideo" className="ml-2 block text-sm text-slate-300">
                    Add Animated Intro (slow)
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
               <div className="flex items-center mb-4">
                  <LayoutTemplateIcon className="w-6 h-6 mr-3 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-slate-200">3. Choose a Style</h2>
              </div>
              {selectedTemplate && (
                <div className="mb-6 bg-slate-700/50 rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 border border-slate-600">
                    <img 
                        src={selectedTemplate.previewImageUrl} 
                        alt={`${selectedTemplate.name} preview`} 
                        className="w-full md:w-64 h-36 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="text-left w-full">
                        <h3 className="font-bold text-lg text-white">{selectedTemplate.name}</h3>
                        <p className="text-sm text-slate-300 mt-1">{selectedTemplate.description}</p>
                    </div>
                </div>
              )}
              <TemplateGallery
                  templates={templatesData}
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                  onPreviewTemplate={handlePreview}
              />
            </div>
            
            <button
              type="submit"
              disabled={!topic.trim()}
              className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg mt-6"
            >
              <MagicWandIcon className="h-6 w-6 mr-2" />
              Generate Presentation
            </button>
          </form>
        </div>
      </div>
      {previewTemplate && (
        <PreviewModal 
          template={previewTemplate}
          onClose={handleClosePreview}
        />
      )}
    </>
  );
};