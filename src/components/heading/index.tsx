import { ReactNode } from 'react';

const LevelH1 = ({ children }: { children: ReactNode }) => (
  <h1 className="lg:text-3xl text-2xl lg:mb-5 mb-3">{children}</h1>
);

const LevelH2 = ({ children }: { children: ReactNode }) => (
  <h1 className="lg:text-3xl text-2xl lg:mb-5 mb-3">{children}</h1>
);

interface HeadingPropsTypes {
  type: 'h1' | 'h2';
  children: ReactNode;
}

export const Heading = ({ type, children }: HeadingPropsTypes) => (
  <>
    {type === 'h1' && (
      <LevelH1>{children}</LevelH1>
    )}
    {type === 'h2' && (
      <LevelH2>{children}</LevelH2>
    )}
  </>
);
