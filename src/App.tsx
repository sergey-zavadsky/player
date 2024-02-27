import { useState } from 'react';
import './App.css';
import { useRecoilState } from 'recoil';
import { currentSongAtom } from '../src/atoms/songState';
import Song from './components/player/Song/Song';
import data from '../src/util/index';

function App() {
	const [isCurrentIndex] = useRecoilState(currentSongAtom);
	const [songs] = useState(data);

	//! TODO Add ease animation to background change
	// const changeBackground = () => {
	// 	const next = (isCurrentIndex + 1) % songs.length;
	// 	console.log(`current: ${isCurrentIndex}`);
	// 	console.log(`next: ${next}`);
	// 	return next;
	// };

	const backgroundImageStyle = {
		backgroundImage: `url(${songs[isCurrentIndex].cover})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		maxHeight: '100vh',
		maxWidth: '100vw',
	};

	return (
		<div style={backgroundImageStyle}>
			<Song songs={songs} />
		</div>
	);
}

export default App;
