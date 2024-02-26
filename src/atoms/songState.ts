import { atom } from 'recoil';

export const songState = atom({
	key: 'LOADING',
	default: false,
});

export const currentSongAtom = atom({
	key: 'CURRENT',
	default: 0,
});

export const songsLengthAtom = atom({
	key: 'LENGTH',
	default: 0,
});
