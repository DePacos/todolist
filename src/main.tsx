import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';

import { providers } from '@/providers/providers';
import { ProviderComposer } from '@/providers/ProvidersComposer';

import '@/assets/fonts/fonts.css';
import '@/styles/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<ProviderComposer providers={providers} />);
