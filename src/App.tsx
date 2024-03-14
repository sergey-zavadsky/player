import { useState, useEffect } from 'react';
import './App.module.scss';
import { useRecoilState } from 'recoil';
import { currentSongAtom } from '../src/atoms/songState';
import Song from './components/player/Song/Song';
import data from '../src/util/index';

function App() {
	const [isCurrentIndex] = useRecoilState(currentSongAtom);
	const [songs] = useState(data);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}, []);

	//! TODO Add ease animation to background change
	// const changeBackground = () => {
	// 	const next = (isCurrentIndex + 1) % songs.length;
	// 	console.log(`current: ${isCurrentIndex}`);
	// 	console.log(`next: ${next}`);
	// 	return next;
	// };

	const backgroundImageStyle = {
		backgroundImage: `url(${songs[isCurrentIndex].cover})`,
		backgroundRepeat: 'no-repeat',
		width: '100%',
		height: '100%',
		backgroundSize: 'cover',
		// backgroundColor: 'rgba(255, 255, 255, 0.25)',
		// Vendor prefixes for broader browser support
		WebkitBackgroundSize: 'cover', // For Safari and Chrome
		MozBackgroundSize: 'cover', // For Firefox
		OBackgroundSize: 'cover', // For Opera
		msBackgroundSize: 'cover', // For Edge
	};

	return (
		<div style={backgroundImageStyle}>
			<Song songs={songs} />
		</div>
	);
}

export default App;
