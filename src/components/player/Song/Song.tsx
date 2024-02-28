import styles from './Song.module.scss';
import Player from '../../player/css/Player';
import { useRecoilState } from 'recoil';
import { currentSongAtom } from '../../../atoms/songState';
import { ChillHopTrack } from '../../../util/index';
import { Helmet } from 'react-helmet';

const Song = ({ songs }: { songs: ChillHopTrack[] }) => {
	const [isCurrentIndex] = useRecoilState(currentSongAtom);
	const current = songs[isCurrentIndex];
	return (
		<>
			<div className={styles['backdrop-container']}>
				<Helmet>
					<title>Siarhei Zavadski react player</title>
					<meta charSet="utf-8" />
					<meta property="og:title" content={current.artist} />
					<meta property="og:description" content={current.name} />
					<meta property="og:image" content={current.cover} />
					<link
						rel="canonical"
						href="https://sergey-zavadsky.github.io/player/"
					/>
				</Helmet>
				<div className={styles['song-container']}>
					<img
						className={styles['img-inside']}
						src={current.cover}
						alt={current.artist}
					/>
					<h2>{current.name}</h2>
					<h3>{current.artist}</h3>
					<Player currentSong={current} songs={songs} />
				</div>
			</div>
		</>
	);
};

export default Song;
