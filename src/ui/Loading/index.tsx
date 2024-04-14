'use client';

/* eslint-disable no-plusplus */

import { Skeleton } from '@/components/skeleton';
import Styles from './style.module.scss';

interface Props {
  groupValue: number;
  itemValue: number;
}

export const LoadingListMovieUI = ({ groupValue, itemValue }: Props) => {
  const groupArray: number[] = [];
  const itemArray: number[] = [];

  for (let i = 1; i <= groupValue; i++) {
    groupArray.push(i);
  }

  for (let i = 1; i <= itemValue; i++) {
    itemArray.push(i);
  }

  return (
    <div className={Styles.wrap}>
      {groupArray.map((group) => (
        <div key={group} className="grid-list-movie">
          {itemArray.map((item) => (
            <Skeleton
              key={item}
              className={Styles.skeleton}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
