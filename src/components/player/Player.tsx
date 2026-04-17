import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { RefObject } from 'react';
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

const formatTime = (time: number) =>
	`${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

// Subscribe a component to the audio element's currentTime without making
// the parent re-render on every timeupdate (~4 Hz).
const useAudioCurrentTime = (
	audioRef: RefObject<HTMLAudioElement | null>,
): number =>
	useSyncExternalStore(
		(onChange) => {
			const audio = audioRef.current;
			if (!audio) return () => {};
			audio.addEventListener('timeupdate', onChange);
			audio.addEventListener('seeking', onChange);
			return () => {
				audio.removeEventListener('timeupdate', onChange);
				audio.removeEventListener('seeking', onChange);
			};
		},
		() => audioRef.current?.currentTime ?? 0,
		() => 0,
	);

type TimeControlProps = {
	audioRef: RefObject<HTMLAudioElement | null>;
	duration: number;
};

const TimeControl = ({ audioRef, duration }: TimeControlProps) => {
	const currentTime = useAudioCurrentTime(audioRef);

	const onSeek: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.currentTime = parseFloat(e.target.value);
	};

	return (
		<div className={styles['time-control']}>
			<p className={styles.left}>{formatTime(currentTime)}</p>
			<input
				className={styles.middle}
				min={0}
				step={1}
				max={duration || 0}
				value={currentTime}
				type="range"
				onChange={onSeek}
			/>
			<p className={styles.right}>{formatTime(duration)}</p>
		</div>
	);
};

type PlayerProps = {
	songs: ChillHopTrack[];
	onAudioError?: () => void;
};

const Player = ({ songs, onAudioError }: PlayerProps) => {
	const { currentIndex, setCurrentIndex } = usePlayer();
	const currentSong = songs[currentIndex];
	const lastIndex = songs.length - 1;

	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const next = songs[(currentIndex + 1) % songs.length];
		const prev = songs[(currentIndex - 1 + songs.length) % songs.length];
		preload(next.cover, { as: 'image' });
		preload(prev.cover, { as: 'image' });
	}, [currentIndex, songs]);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) {
			audio.play();
			setPlaying(true);
		} else {
			audio.pause();
			setPlaying(false);
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
	}, [currentSong, currentIndex, isPlaying]);

	const onLoadedMetadata: React.ReactEventHandler<HTMLAudioElement> = (e) => {
		setDuration(e.currentTarget.duration || 0);
		if (isPlaying) e.currentTarget.play();
	};

	const handleAudioError: React.ReactEventHandler<HTMLAudioElement> = () => {
		onAudioError?.();
		playNext();
	};

	const onKeyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (document.activeElement instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') playPrev();
		if (e.key === 'ArrowRight') playNext();
		if (e.key === ' ' || e.key === 'Enter') togglePlay();
	};

	return (
		<div className={styles.Player} tabIndex={0} onKeyDown={onKeyDownHandler}>
			<TimeControl audioRef={audioRef} duration={duration} />

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
				onLoadedMetadata={onLoadedMetadata}
				onEnded={playNext}
				onError={handleAudioError}
			/>
		</div>
	);
};

export default Player;
