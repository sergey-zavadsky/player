import styles from './Song.module.scss';
import Player from '../../player/css/Player';
import { useRecoilState } from 'recoil';
import { currentSongAtom } from '../../../atoms/songState';
import { ChillHopTrack } from '../../../util/index';

const Song = ({ songs }: { songs: ChillHopTrack[] }) => {
	const [isCurrentIndex] = useRecoilState(currentSongAtom);
	const current = songs[isCurrentIndex];
	return (
		<>
			<div className={styles['song-container']}>
				<img src={current.cover} alt={current.artist} />
				<h2>{current.name}</h2>
				<h3>{current.artist}</h3>
				<Player currentSong={current} songs={songs} />
			</div>
		</>
	);
};

export default Song;
