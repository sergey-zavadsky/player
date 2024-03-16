import { useState, useEffect } from 'react';
// import { preload } from 'react-dom';
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

	//! TODO Add ease animation to background change + IMGpreLoad
	// const [trackPos, setTrackPos] = useState({
	// 	nextTrack: 0,
	// 	prevTrack: 0,
	// });

	// const changeBackgroundPos = () => {
	// 	const nextTrack = (isCurrentIndex + 1) % songs.length;
	// 	const prevTrack = (isCurrentIndex - 1) % songs.length;

	// 	const latestTrackInArray = songs.lastIndexOf(songs.at(-1));

	// 	if (prevTrack === -1) {
	// 		setTrackPos({ nextTrack: nextTrack, prevTrack: latestTrackInArray });
	// 	} else {
	// 		setTrackPos({ nextTrack: nextTrack, prevTrack: prevTrack });
	// 	}
	// };

	// useEffect(() => {
	// 	changeBackgroundPos();
	// 	// backgroundImageStyle = (prev) => ({
	// 	// 	...prev,
	// 	// 	backgroundImage: '2',
	// 	// 	transition: 'background-color 2s ease-out',
	// 	// });
	// }, [isCurrentIndex]);

	const backgroundImageStyle = {
		backgroundImage: `url(${songs[isCurrentIndex].cover})`,
		backgroundRepeat: 'no-repeat',
		width: '100%',
		height: '100%',
		backgroundSize: 'cover',
		WebkitBackgroundSize: 'cover', // For Safari and Chrome
		MozBackgroundSize: 'cover', // For Firefox
		OBackgroundSize: 'cover', // For Opera
		msBackgroundSize: 'cover', // For Edge
		// transition: 'background-image 1s ease',
		position: 'absolute',
	} as React.CSSProperties;

	return (
		<div style={backgroundImageStyle}>
			<Song songs={songs} />
		</div>
	);
}

export default App;
