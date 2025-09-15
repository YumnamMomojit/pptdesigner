
import React from 'react';
import { FilmIcon } from './icons';

interface HeaderProps {
    onNewPresentation: () => void;
    showNewButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNewPresentation, showNewButton }) => {
    return (
        <header className="w-full p-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center">
                <FilmIcon className="h-8 w-8 text-indigo-400 mr-3" />
                <h1 className="text-xl font-bold text-white">AI Presentation Pro</h1>
            </div>
            {showNewButton && (
                 <button
                    onClick={onNewPresentation}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                >
                    + New Presentation
                </button>
            )}
        </header>
    );
}
