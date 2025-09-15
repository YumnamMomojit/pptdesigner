import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PresentationGenerator } from './components/PresentationGenerator';
import { LoadingIndicator } from './components/LoadingIndicator';
import { PresentationEditor } from './components/PresentationEditor';
import { generateSlidesAndMedia } from './services/geminiService';
import type { GenerationConfig, Presentation, Template } from './types';

type AppState = 'idle' | 'loading' | 'presenting' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<Template | undefined>();

  const handleGenerate = useCallback(async (config: GenerationConfig) => {
    setAppState('loading');
    setLoadingStep('Initializing generation...');
    setError(null);
    setCurrentTemplate(config.template);
    try {
      const result = await generateSlidesAndMedia(config, setLoadingStep);
      setPresentation(result);
      setAppState('presenting');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setAppState('error');
    }
  }, []);

  const handleNewPresentation = () => {
    setPresentation(null);
    setAppState('idle');
    setError(null);
  };
  
  const handleUpdatePresentation = (updatedPresentation: Presentation) => {
    setPresentation(updatedPresentation);
  };


  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return <div className="w-full max-w-2xl mx-auto"><LoadingIndicator step={loadingStep} /></div>;
      case 'presenting':
        if (presentation) {
          return <PresentationEditor presentation={presentation} templateStylePrompt={currentTemplate?.stylePrompt} onUpdatePresentation={handleUpdatePresentation} />;
        }
        // Fallback to error state if presentation is null
        setAppState('error');
        setError("Presentation data is missing.");
        return null;
      case 'error':
        return (
          <div className="text-center p-8 bg-red-900/50 border border-red-700 rounded-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mt-6 text-white">Generation Failed</h2>
            <p className="text-red-300 mt-2">{error}</p>
            <button
              onClick={handleNewPresentation}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Try Again
            </button>
          </div>
        );
      case 'idle':
      default:
        return <PresentationGenerator onGenerate={handleGenerate} />;
    }
  };

  const isEditorView = appState === 'presenting' && presentation;

  return (
    <div className={`min-h-screen bg-slate-900 text-white font-sans ${isEditorView ? '' : 'flex flex-col'}`}>
      <Header onNewPresentation={handleNewPresentation} showNewButton={appState !== 'idle'} />
      <main className={`flex-1 flex items-center justify-center ${isEditorView ? '' : 'p-4 md:p-8'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
