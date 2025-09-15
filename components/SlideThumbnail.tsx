import React from 'react';
import type { Slide } from '../types';
import { ImageIcon } from './icons';

interface SlideThumbnailProps {
  slide: Slide;
  slideNumber: number;
  isActive: boolean;
  onClick: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  isDragging?: boolean;
}

export const SlideThumbnail: React.FC<SlideThumbnailProps> = ({
  slide,
  slideNumber,
  isActive,
  onClick,
  draggable,
  onDragStart,
  onDragEnd,
  isDragging,
}) => {
  const activeClasses = 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-800';
  const draggingClasses = isDragging ? 'opacity-40' : '';
  const baseClasses = 'w-full aspect-video rounded-md flex items-center justify-between p-2 text-white bg-slate-700 hover:bg-slate-600 transition-all duration-200';

  return (
    <div className="flex items-center gap-3">
      <span className={`font-mono text-sm ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}>
        {slideNumber}
      </span>
      <div
        className={`${baseClasses} ${isActive ? activeClasses : 'border border-transparent'} ${draggingClasses}`}
        onClick={onClick}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        style={{ cursor: draggable ? 'grab' : 'pointer' }}
      >
        <div className="w-2/3 text-left">
          <p className="text-xs font-bold truncate">{slide.title}</p>
          <p className="text-[10px] text-slate-400 truncate">{slide.bullets.join(', ')}</p>
        </div>
        <div className="w-1/3 h-full bg-slate-800 rounded-sm flex items-center justify-center">
          {slide.imageUrl ? (
            <img src={slide.imageUrl} alt="thumbnail" className="w-full h-full object-cover rounded-sm" />
          ) : (
            <ImageIcon className="h-4 w-4 text-slate-500" />
          )}
        </div>
      </div>
    </div>
  );
};