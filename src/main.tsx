import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RecoilRoot>
			<RecoilNexus />
			<App />
		</RecoilRoot>
	</React.StrictMode>,
);
