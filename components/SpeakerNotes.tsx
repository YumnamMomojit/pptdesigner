
import React from 'react';

interface SpeakerNotesProps {
  notes: string;
}

export const SpeakerNotes: React.FC<SpeakerNotesProps> = ({ notes }) => {
  return (
    <div className="p-4 h-full">
      <h3 className="text-sm font-semibold text-slate-400 mb-2">Speaker Notes</h3>
      <div className="prose prose-sm text-slate-300 overflow-y-auto h-[calc(100%-2rem)]">
        <p>{notes}</p>
      </div>
    </div>
  );
};
