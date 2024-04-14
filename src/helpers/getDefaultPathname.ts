'use client';

import { usePathname } from 'next/navigation';

export const defaultPathname = () => {
  const currentPathname = usePathname();

  const split = currentPathname.split('/');

  return `/${split[1]}`;
};

export const getLastPatname = () => {
  let pathname = '';

  const currentPathname = usePathname();

  const split = currentPathname.split('/');

  split.slice(2, split.length).forEach((item) => {
    pathname += `${item}/`;
  });

  return pathname;
};
