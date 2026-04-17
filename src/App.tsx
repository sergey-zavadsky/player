import { useEffect, useState } from 'react';
import './App.module.scss';
import { PlayerContext } from './atoms/songState';
import Song from './components/player/Song/Song';
import songs from './util';

const FALLBACK_COVER = `${import.meta.env.BASE_URL}headphones.svg`;

function App() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [brokenCovers, setBrokenCovers] = useState<Set<string>>(new Set());

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}, []);

	const song = songs[currentIndex];
	const cover = brokenCovers.has(song.id) ? FALLBACK_COVER : song.cover;

	const markCoverBroken = (id: string) => {
		setBrokenCovers((prev) => {
			if (prev.has(id)) return prev;
			const next = new Set(prev);
			next.add(id);
			return next;
		});
	};

	const backgroundImageStyle: React.CSSProperties = {
		backgroundImage: `url(${cover})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '100%',
		position: 'absolute',
	};

	return (
		<PlayerContext value={{ currentIndex, setCurrentIndex }}>
			<div style={backgroundImageStyle}>
				<Song
					songs={songs}
					cover={cover}
					onCoverError={() => markCoverBroken(song.id)}
				/>
			</div>
		</PlayerContext>
	);
}

export default App;
