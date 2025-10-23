import { type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Error } from '@/components/error';

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      children={children}
      fallback={
        <Error description="Something went wrong, refresh the page or contact the developers" />
      }
    />
  );
};
