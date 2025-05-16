import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store.ts';

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};
