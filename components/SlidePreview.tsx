import React, { useEffect, useState } from 'react';
import type { Slide, Template } from '../types';
import { ImageIcon, MedhaviLogo } from './icons';
import mermaid from 'mermaid';

// Mermaid rendering component
const Mermaid: React.FC<{ chart: string }> = ({ chart }) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        mermaid.initialize({ startOnLoad: false, theme: 'dark', darkMode: true });
        const cleanChart = chart.replace(/^```mermaid\n/, '').replace(/\n```$/, '').trim();
        const { svg: renderedSvg } = await mermaid.render(`mermaid-graph-${Math.random().toString(36).substring(7)}`, cleanChart);
        setSvg(renderedSvg);
        setError(null);
      } catch (e) {
        console.error("Mermaid rendering failed:", e);
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        setError(`Failed to render diagram. Check syntax.\n${errorMessage}`);
        setSvg(null);
      }
    };
    renderMermaid();
  }, [chart]);

  if (error) {
    return (
        <div className="my-4 p-4 w-full bg-red-900/50 text-red-300 rounded-md border border-red-700">
            <p className="font-bold">Diagram Error</p>
            <pre className="text-xs whitespace-pre-wrap">{error}</pre>
        </div>
    );
  }

  if (svg) {
    return <div className="w-full flex justify-center items-center my-4" dangerouslySetInnerHTML={{ __html: svg }} />;
  }
  
  return (
    <div className="text-center p-4 w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400 mx-auto"></div>
        <p className="mt-2 text-sm text-slate-400">Rendering Diagram...</p>
    </div>
  );
};

// Medhavi theme wrapper
const MedhaviTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col bg-white text-gray-800 relative">
            <div className="absolute top-0 left-0 w-full h-3 flex">
                <div className="w-[40%]" style={{ backgroundColor: '#4A4A4A' }}></div>
                <div className="w-[20%]" style={{ backgroundColor: '#00AEEF' }}></div>
                <div className="w-[40%]" style={{ backgroundColor: '#4A4A4A' }}></div>
            </div>
            
            <header className="p-6 pt-10">
                <MedhaviLogo />
            </header>
            
            <main className="flex-1 flex overflow-hidden p-6">
                {children}
            </main>
        </div>
    );
};


export const SlidePreview: React.FC<{ slide: Slide; isRegenerating: boolean; template?: Template; }> = ({ slide, isRegenerating, template }) => {
  const containsMermaid = slide.bullets.some(b => b.trim().startsWith('```mermaid'));
  const isMedhaviTheme = template?.id === 'template-medhavi';

  const titleClasses = isMedhaviTheme 
    ? 'text-gray-800' 
    : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500';
  
  const bulletContainerClasses = isMedhaviTheme ? 'text-gray-700' : 'text-slate-300';
  const bulletPointClasses = isMedhaviTheme ? 'text-cyan-600' : 'text-indigo-400';
  const imageContainerClasses = isMedhaviTheme ? 'bg-gray-100' : 'bg-slate-900';
  const mainContainerClasses = isMedhaviTheme ? '' : 'bg-slate-800 text-white';

  const slideContent = (
      <div className={`w-full h-full flex flex-col md:flex-row ${mainContainerClasses}`}>
        {/* Left side: Text content */}
        <div className={`w-full ${containsMermaid ? 'md:w-full' : 'md:w-1/2'} p-8 flex flex-col justify-center`}>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${titleClasses}`}>
            {slide.title}
          </h2>
          <div className={`space-y-4 text-lg ${bulletContainerClasses}`}>
            {slide.bullets.map((bullet, index) => {
              if (bullet.trim().startsWith('```mermaid')) {
                return <Mermaid key={index} chart={bullet} />;
              }
              return (
                <div key={index} className="flex items-start">
                  <span className={`${bulletPointClasses} mr-3 mt-1`}>&#9679;</span>
                  <span>{bullet}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Image (only if no mermaid diagram) */}
        {!containsMermaid && (
         <div className={`w-full md:w-1/2 h-64 md:h-full flex items-center justify-center relative ${imageContainerClasses}`}>
         {slide.imageUrl ? (
           <>
             <img
               src={slide.imageUrl}
               alt={slide.image_prompt}
               className={`w-full h-full object-cover transition-opacity duration-300 ${isRegenerating ? 'opacity-30' : 'opacity-100'}`}
             />
              {isRegenerating && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                     <div className="text-white text-center">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                         <p className="mt-2">Updating visual...</p>
                     </div>
                 </div>
             )}
           </>
         ) : (
           <div className="text-slate-500 flex flex-col items-center">
             <ImageIcon className="h-16 w-16 mb-2" />
             <span>No image generated</span>
           </div>
         )}
       </div>
        )}
      </div>
  );

  if (isMedhaviTheme) {
    return <MedhaviTheme>{slideContent}</MedhaviTheme>;
  }

  return slideContent;
};