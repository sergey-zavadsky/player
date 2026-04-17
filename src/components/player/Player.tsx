import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import styles from './Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from '../../atoms/songState';
import type { ChillHopTrack } from '../../util';

type SongInfo = {
	currentTime: number;
	durationTime: number;
};

const formatTime = (time: number) =>
	`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

const Player = ({ songs }: { songs: ChillHopTrack[] }) => {
	const { currentIndex, setCurrentIndex } = usePlayer();
	const currentSong = songs[currentIndex];
	const lastIndex = songs.length - 1;

	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState<SongInfo>({
		currentTime: 0,
		durationTime: 0,
	});

	// React 19: preload neighbouring cover art so background swaps are instant.
	useEffect(() => {
		const next = songs[(currentIndex + 1) % songs.length];
		const prev = songs[(currentIndex - 1 + songs.length) % songs.length];
		preload(next.cover, { as: 'image' });
		preload(prev.cover, { as: 'image' });
	}, [currentIndex, songs]);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
			setPlaying(false);
		} else {
			audio.play();
			setPlaying(true);
		}
	};

	const playNext = () => {
		setCurrentIndex(currentIndex === lastIndex ? 0 : currentIndex + 1);
		setPlaying(true);
	};

	const playPrev = () => {
		setCurrentIndex(currentIndex === 0 ? lastIndex : currentIndex - 1);
		setPlaying(true);
	};

	// MediaSession metadata + hardware controls.
	useEffect(() => {
		if (!('mediaSession' in navigator)) return;

		navigator.mediaSession.metadata = new MediaMetadata({
			title: currentSong.name,
			artist: currentSong.artist,
			artwork: [
				{ src: currentSong.cover, sizes: '512x512', type: 'image/png' },
			],
		});

		navigator.mediaSession.setActionHandler('play', togglePlay);
		navigator.mediaSession.setActionHandler('pause', togglePlay);
		navigator.mediaSession.setActionHandler('previoustrack', playPrev);
		navigator.mediaSession.setActionHandler('nexttrack', playNext);
	});

	const timeUpdateHandler: React.ReactEventHandler<HTMLAudioElement> = (e) => {
		const { currentTime, duration } = e.currentTarget;
		setSongInfo({
			currentTime: currentTime || 0,
			durationTime: duration || 0,
		});
	};

	const dragHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const audio = audioRef.current;
		if (!audio) return;
		const newValue = parseFloat(e.target.value);
		audio.currentTime = newValue;
		setSongInfo((prev) => ({ ...prev, currentTime: newValue }));
	};

	const onKeyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (document.activeElement instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') playPrev();
		if (e.key === 'ArrowRight') playNext();
		if (e.key === ' ' || e.key === 'Enter') togglePlay();
	};

	// Autoplay whenever the track changes while playing.
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) audio.play();
	}, [currentIndex, isPlaying]);

	return (
		<div className={styles.Player} tabIndex={0} onKeyDown={onKeyDownHandler}>
			<div className={styles['time-control']}>
				<p className={styles.left}>{formatTime(songInfo.currentTime)}</p>
				<input
					className={styles.middle}
					min={0}
					step={10}
					max={songInfo.durationTime}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p className={styles.right}>{formatTime(songInfo.durationTime)}</p>
			</div>
			<div className={styles['play-control']}>
				<div className={styles['skip-back']}>
					<FontAwesomeIcon
						size="2x"
						icon={faAngleLeft}
						onClick={playPrev}
						tabIndex={0}
					/>
				</div>
				<div
					className={isPlaying ? styles['toggle-pause'] : styles['toggle-play']}
				>
					<FontAwesomeIcon
						size="2x"
						icon={isPlaying ? faPause : faPlay}
						onClick={togglePlay}
						tabIndex={0}
					/>
				</div>
				<div className={styles['skip-forward']}>
					<FontAwesomeIcon
						size="2x"
						icon={faAngleRight}
						onClick={playNext}
						tabIndex={0}
					/>
				</div>
			</div>

			<audio
				ref={audioRef}
				src={currentSong.audio}
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={playNext}
			/>
		</div>
	);
};

export default Player;
