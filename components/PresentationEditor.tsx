import React, { useState, useCallback } from 'react';
import type { Presentation, Slide, Template } from '../types';
import { SlideThumbnail } from './SlideThumbnail';
import { SlidePreview } from './SlidePreview';
import { SpeakerNotes } from './SpeakerNotes';
import { VersionHistory } from './VersionHistory';
import { RefreshCwIcon, DownloadIcon } from './icons';
import { generateImageForPrompt } from '../services/geminiService';

interface PresentationEditorProps {
  presentation: Presentation;
  template?: Template;
  onUpdatePresentation: (updatedPresentation: Presentation) => void;
}

export const PresentationEditor: React.FC<PresentationEditorProps> = ({ presentation, template, onUpdatePresentation }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null); // holds slide id

  const activeSlide = presentation.slides[activeSlideIndex];

  const handleRegenerateImage = useCallback(async (slide: Slide) => {
    if (isRegenerating) return;
    setIsRegenerating(slide.id);
    try {
      const newImageUrl = await generateImageForPrompt(slide.image_prompt, template?.stylePrompt);
      const updatedSlides = presentation.slides.map(s => 
        s.id === slide.id ? { ...s, imageUrl: newImageUrl } : s
      );
      onUpdatePresentation({ ...presentation, slides: updatedSlides });
    } catch (error) {
      console.error("Failed to regenerate image:", error);
      // You could add a user-facing error message here
    } finally {
      setIsRegenerating(null);
    }
  }, [isRegenerating, presentation, onUpdatePresentation, template]);

  return (
    <div className="h-screen w-full flex flex-col bg-slate-900 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
            {/* Left Sidebar: Slide Thumbnails */}
            <aside className="w-1/5 bg-slate-800 p-4 overflow-y-auto flex-shrink-0">
                <h2 className="text-lg font-semibold text-white mb-4">Slides</h2>
                <div className="space-y-3">
                    {presentation.slides.map((slide, index) => (
                        <SlideThumbnail
                            key={slide.id}
                            slide={slide}
                            slideNumber={index + 1}
                            isActive={index === activeSlideIndex}
                            onClick={() => setActiveSlideIndex(index)}
                        />
                    ))}
                </div>
            </aside>

            {/* Center: Main Slide Preview & Speaker Notes */}
            <section className="flex-1 w-3/5 flex flex-col overflow-hidden">
                <div className="flex-1 relative bg-black">
                    {activeSlide && <SlidePreview slide={activeSlide} isRegenerating={isRegenerating === activeSlide.id} template={template} />}
                </div>
                 <div className="h-1/4 bg-slate-800 border-t border-slate-700 overflow-hidden">
                    {activeSlide && <SpeakerNotes notes={activeSlide.speaker_notes} />}
                </div>
            </section>

            {/* Right Sidebar: Controls and Version History */}
            <aside className="w-1/5 bg-slate-800 flex flex-col">
                <div className="p-4 border-b border-slate-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Controls</h2>
                    <div className="space-y-2">
                        <button 
                          onClick={() => activeSlide && handleRegenerateImage(activeSlide)}
                          disabled={isRegenerating !== null || !activeSlide?.imageUrl}
                          className="w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                        >
                            <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRegenerating === activeSlide?.id ? 'animate-spin' : ''}`} />
                            Regenerate Image
                        </button>
                        <button className="w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download Assets
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <VersionHistory />
                </div>
            </aside>
        </main>
    </div>
  );
};