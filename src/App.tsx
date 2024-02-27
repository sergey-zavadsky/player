import { useState, useEffect } from 'react';
import './App.css';
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
		// backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		// backgroundSize: 'cover',
		// height: '100vh',
		// width: '100vw',
		// overflow: 'hidden',
	};

	return (
		<div style={backgroundImageStyle}>
			<Song songs={songs} />
		</div>
	);
}

export default App;
