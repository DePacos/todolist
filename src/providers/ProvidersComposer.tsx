import type { FC, PropsWithChildren } from 'react';

type Props = {
  providers: FC<PropsWithChildren>[];
} & PropsWithChildren;

export const ProviderComposer = ({ providers, children }: Props) => {
  return (
    <>
      {providers.reduceRight(
        (child, Provider) => (
          <Provider>{child}</Provider>
        ),
        children,
      )}
    </>
  );
};
