import type { PropsWithChildren } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

export const SkeletonProvider = ({ children }: PropsWithChildren) => {
  return (
    <SkeletonTheme borderRadius="0" baseColor="#52469f" highlightColor="#ccc">
      {children}
    </SkeletonTheme>
  );
};
