import { useEffect, useState } from 'react';
import './App.module.scss';
import { PlayerContext } from './atoms/songState';
import Song from './components/player/Song/Song';
import songs from './util';

function App() {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}, []);

	const backgroundImageStyle: React.CSSProperties = {
		backgroundImage: `url(${songs[currentIndex].cover})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '100%',
		position: 'absolute',
	};

	return (
		<PlayerContext value={{ currentIndex, setCurrentIndex }}>
			<div style={backgroundImageStyle}>
				<Song songs={songs} />
			</div>
		</PlayerContext>
	);
}

export default App;
