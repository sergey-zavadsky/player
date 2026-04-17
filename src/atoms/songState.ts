import { createContext, use } from 'react';

export type PlayerStore = {
	currentIndex: number;
	setCurrentIndex: (index: number) => void;
};

export const PlayerContext = createContext<PlayerStore | null>(null);

export const usePlayer = (): PlayerStore => {
	const ctx = use(PlayerContext);
	if (!ctx) throw new Error('usePlayer must be used within <PlayerContext>');
	return ctx;
};
