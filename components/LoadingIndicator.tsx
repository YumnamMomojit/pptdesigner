
import React from 'react';
import { VIDEO_GENERATION_MESSAGES } from '../constants';

interface LoadingIndicatorProps {
  step: string;
}

const VideoLoadingMessages: React.FC = () => {
    const [messageIndex, setMessageIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex(prevIndex => (prevIndex + 1) % VIDEO_GENERATION_MESSAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return <p className="text-lg text-slate-400 mt-2">{VIDEO_GENERATION_MESSAGES[messageIndex]}</p>;
};


export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ step }) => {
  const isVideoStep = step.toLowerCase().includes('video');

  return (
    <div className="text-center p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto"></div>
      <h2 className="text-2xl font-semibold mt-6 text-white">{step}</h2>
      {isVideoStep && <VideoLoadingMessages />}
    </div>
  );
};
