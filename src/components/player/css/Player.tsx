import React, { useEffect, useRef, useState } from 'react';
import styles from './Player.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { currentSongAtom } from '../../../atoms/songState';
import { ChillHopTrack } from '../../../util';

const Player = ({
	currentSong,
	songs,
}: {
	currentSong: ChillHopTrack;
	songs: ChillHopTrack[];
}) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setPlaying] = useState(false);
	const [isLength] = useState(songs.length - 1);
	const [isCurrentIndex, setCurrentIndex] = useRecoilState(currentSongAtom);
	const skipBackRef = useRef(null);

	//* Control handlers
	const playCurrent = () => {
		if (audioRef.current !== null) {
			switch (isPlaying) {
				case false:
					audioRef.current.play();
					setPlaying(!isPlaying);
					break;

				case true:
					audioRef.current.pause();
					setPlaying(!isPlaying);
					break;
			}
		}
	};

	const playNext = () => {
		if (audioRef.current !== null) {
			if (isLength > isCurrentIndex) {
				setCurrentIndex(isCurrentIndex + 1);
				audioRef.current.autoplay = true;
				setPlaying(true);
			}
			if (isLength === isCurrentIndex) {
				setCurrentIndex(0);
			}
		}
	};

	const playPrev = () => {
		if (audioRef.current !== null) {
			if (0 === isCurrentIndex) {
				setCurrentIndex(isLength);
				audioRef.current.autoplay = true;
				setPlaying(true);
			}
			if (isCurrentIndex > 0) {
				setCurrentIndex(isCurrentIndex - 1);
				audioRef.current.autoplay = true;
				setPlaying(true);
			}
		}
	};

	//* State of songInfo
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		durationTime: 0,
		stoppedTime: 0,
	});

	//* Handle mobile apps playing window

	const updatePositionState = () => {
		if (audioRef.current) {
			navigator.mediaSession.setPositionState({
				duration: songInfo.durationTime,
				position:
					songInfo.stoppedTime > 0
						? songInfo.stoppedTime
						: songInfo.currentTime,
			});
		}
	};

	useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: currentSong.name,
				artist: currentSong.artist,
				// album: currentSong.album,
				artwork: [
					{ src: currentSong.cover, sizes: '512x512', type: 'image/png' },
				],
			});

			navigator.mediaSession.setActionHandler('play', () => {
				if (audioRef.current) {
					audioRef.current.play();
					setPlaying(true);
					updatePositionState();
				}
			});

			navigator.mediaSession.setActionHandler('pause', () => {
				if (audioRef.current) {
					audioRef.current.pause();
					setPlaying(false);
					updatePositionState();
					// setSongInfo((prevSongInfo) => ({
					// 	...prevSongInfo,
					// 	stoppedTime: audioRef.current.currentTime,
					// }));
				}
			});

			navigator.mediaSession.setActionHandler('previoustrack', () => {
				playPrev();
				updatePositionState();
				setSongInfo((prevSongInfo) => ({
					...prevSongInfo,
					currentTime: 0,
				}));
			});

			navigator.mediaSession.setActionHandler('nexttrack', () => {
				playNext();
				updatePositionState();
				setSongInfo((prevSongInfo) => ({
					...prevSongInfo,
					currentTime: 0,
				}));
			});
		}
	}, [currentSong, songs]);

	//* Play if current song is finished
	useEffect(() => {
		if (
			songInfo.currentTime === songInfo.durationTime &&
			songInfo.currentTime !== 0
		) {
			playNext();
		}
	}, [songInfo.currentTime]);

	//* Time Handler
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const audioUpdate = (audioElement: any) => {
		const current = audioElement.currentTime;
		const duration = audioElement.duration;
		setSongInfo((prevSongInfo) => ({
			...prevSongInfo,
			currentTime: current || 0,
			durationTime: duration || 0,
		}));
	};

	const timeUpdateHandler: React.ReactEventHandler<HTMLAudioElement> = (e) => {
		const audioElement = e.target as unknown as HTMLAudioElement;
		audioUpdate(audioElement);
	};

	//* Drag Handler
	const dragHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (audioRef.current !== null) {
			const newValue = parseFloat(e.target.value);
			audioRef.current.currentTime = newValue;
			setSongInfo((prevSongInfo) => ({
				...prevSongInfo,
				currentTime: newValue,
			}));
		}
	};

	const getTime = (time: number) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	//* Keys handler
	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const isInputFocused = document.activeElement instanceof HTMLInputElement;

		if (isInputFocused) {
			return;
		}
		if (e.key === 'ArrowLeft') {
			playPrev();
		}
		if (e.key === 'ArrowRight') {
			playNext();
		}
		if (e.key === ' ' || e.key === 'Enter') {
			playCurrent();
		}
	};

	return (
		<div
			className={styles.Player}
			tabIndex={0}
			onKeyDown={(e) => onKeyDownHandler(e)}
		>
			<div className={styles[`time-control`]}>
				<p className={`${styles['left']}`}>{getTime(songInfo.currentTime)}</p>
				<input
					className={`${styles['middle']}`}
					min={0}
					step={10}
					max={songInfo.durationTime}
					value={songInfo.currentTime}
					type="range"
					onChange={(e) => dragHandler(e)}
				/>
				<p className={`${styles['right']}`}>{getTime(songInfo.durationTime)}</p>
			</div>
			<div className={styles['play-control']}>
				<div className={`${styles['skip-back']}`}>
					<FontAwesomeIcon
						ref={skipBackRef}
						size="2x"
						icon={faAngleLeft}
						onClick={() => playPrev()}
						tabIndex={0}
					/>
				</div>
				<div
					className={`${
						!isPlaying ? styles['toggle-play'] : styles['toggle-pause']
					}`}
				>
					<FontAwesomeIcon
						size="2x"
						icon={!isPlaying ? faPlay : faPause}
						onClick={() => playCurrent()}
						tabIndex={0}
					/>
				</div>
				<div className={styles['skip-forward']}>
					<FontAwesomeIcon
						size="2x"
						icon={faAngleRight}
						onClick={() => playNext()}
						tabIndex={0}
					/>
				</div>
			</div>

			<audio
				onTimeUpdate={(e) => timeUpdateHandler(e)}
				ref={audioRef}
				src={currentSong.audio}
				onLoadedMetadata={(e) => timeUpdateHandler(e)}
			></audio>
		</div>
	);
};

export default Player;
