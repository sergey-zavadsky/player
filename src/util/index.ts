export interface ChillHopTrack {
	name: string;
	cover: string;
	artist: string;
	audio: string;
	color: string[];
	id: string;
	active: boolean;
}

const chillHop: ChillHopTrack[] = [
	{
		name: 'Beaver Creek',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
		artist: 'Aso, Middle School, Aviino',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=10075',
		color: ['#205950', '#2ab3bf'],
		id: crypto.randomUUID(),
		active: true,
	},
	{
		name: 'Daylight',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
		artist: 'Aiguille',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=9272',
		color: ['#EF8EA9', '#ab417f'],
		id: crypto.randomUUID(),
		active: false,
	},
	{
		name: 'Keep Going',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
		artist: 'Swørn',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=9222',
		color: ['#CD607D', '#c94043'],
		id: crypto.randomUUID(),
		active: false,
	},
	{
		name: 'Nightfall',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
		artist: 'Aiguille',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=9148',
		color: ['#EF8EA9', '#ab417f'],
		id: crypto.randomUUID(),
		active: false,
	},
	{
		name: 'Reflection',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
		artist: 'Swørn',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=9228',
		color: ['#CD607D', '#c94043'],
		id: crypto.randomUUID(),
		active: false,
	},
	{
		name: 'Under the City Stars',
		cover:
			'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
		artist: 'Aso, Middle School, Aviino',
		audio: 'https://mp3.chillhop.com/serve.php/?mp3=10074',
		color: ['#205950', '#2ab3bf'],
		id: crypto.randomUUID(),
		active: false,
	},
	{
		name: 'Hushed Awakening',
		cover: 'https://i.scdn.co/image/ab67616d0000b273704fd499ab5d0530ac1a8f2f',
		artist: 'Enzalla, Majko',
		audio: 'https://stream.chillhop.com/mp3/73622',
		color: ['#000000', '#FFFFFF'],
		id: '46a6f71c-7885-4722-8b59-dbbca75af523',
		active: false,
	},
	{
		name: '3am, Sao Paulo',
		cover: 'https://i.scdn.co/image/ab67616d0000b273114e5190a56db4e6f99ef684',
		artist: 'Psalm Trees, less.people',
		audio: 'https://stream.chillhop.com/mp3/73624',
		color: ['#000000', '#FFFFFF'],
		id: 'ead45629-27ce-472a-9f66-7f86e648280b',
		active: true,
	},
	{
		name: 'Cheonsa',
		cover: 'https://i.scdn.co/image/ab67616d0000b273c57e1118ff9ff90d5a389583',
		artist: 'SwuM, Lenny Loops',
		audio: 'https://stream.chillhop.com/mp3/73625',
		color: ['#000000', '#FFFFFF'],
		id: '3e83c5ba-77e3-4b8b-85a8-c1c0a1a3a7a3',
		active: false,
	},
	{
		name: 'Wishful thinking',
		cover: 'https://i.scdn.co/image/ab67616d0000b27314dba0d01ff4f9323400c3f2',
		artist: 'Philanthrope, mommy, Dotlights',
		audio: 'https://stream.chillhop.com/mp3/73626',
		color: ['#000000', '#FFFFFF'],
		id: 'd1c1575c-d9c8-46f0-bb8f-0d59a0d8ac4f',
		active: false,
	},
	{
		name: 'Sweetcalm',
		cover: 'https://i.scdn.co/image/ab67616d0000b2730dcb8d1e040cb74ed7f57b98',
		artist: 'Tesk',
		audio: 'https://stream.chillhop.com/mp3/73627',
		color: ['#000000', '#FFFFFF'],
		id: '59ad5f3f-5377-4d09-8a5e-5219b207d0a2',
		active: false,
	},
];

export default chillHop;
