import styles from './Song.module.scss';
import Player from '../Player';
import { usePlayer } from '../../../atoms/songState';
import type { ChillHopTrack } from '../../../util';

const Song = ({ songs }: { songs: ChillHopTrack[] }) => {
	const { currentIndex } = usePlayer();
	const current = songs[currentIndex];

	return (
		<div className={styles['backdrop-container']}>
			<title>Siarhei Zavadski react player</title>
			<meta property="og:title" content={current.artist} />
			<meta property="og:description" content={current.name} />
			<meta property="og:image" content={current.cover} />
			<link rel="canonical" href="https://sergey-zavadsky.github.io/player/" />

			<div className={styles['song-container']}>
				<img
					className={styles['img-inside']}
					src={current.cover}
					alt={current.artist}
				/>
				<h2>{current.name}</h2>
				<h3>{current.artist}</h3>
				<Player songs={songs} />
			</div>
		</div>
	);
};

export default Song;
