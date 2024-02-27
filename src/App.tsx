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
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundAttachment: 'fixed',
		WebkitBackgroundSize: 'cover',
		MozBackgroundSize: 'cover',
		OBackgroundSize: 'cover',
		backgroundSize: 'cover',
	};

	return (
		<div style={backgroundImageStyle}>
			<Song songs={songs} />
		</div>
	);
}

export default App;
