import styles from './Song.module.scss';
import Player from '../Player';
import { usePlayer } from '../../../atoms/songState';
import type { ChillHopTrack } from '../../../util';

type SongProps = {
	songs: ChillHopTrack[];
	cover: string;
	onCoverError: () => void;
};

const Song = ({ songs, cover, onCoverError }: SongProps) => {
	const { currentIndex } = usePlayer();
	const current = songs[currentIndex];

	return (
		<div className={styles['backdrop-container']}>
			<title>Siarhei Zavadski react player</title>
			<meta property="og:title" content={current.artist} />
			<meta property="og:description" content={current.name} />
			<meta property="og:image" content={cover} />
			<link rel="canonical" href="https://sergey-zavadsky.github.io/player/" />

			<div className={styles['song-container']}>
				<img
					className={styles['img-inside']}
					src={cover}
					alt={current.artist}
					onError={onCoverError}
				/>
				<h2>{current.name}</h2>
				<h3>{current.artist}</h3>
				<Player songs={songs} />
			</div>
		</div>
	);
};

export default Song;
