import ReactDOM from 'react-dom/client';

import '../src/assets/fonts/fonts.css';
import './styles/global.css';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
