'use client';

import { LikeFilled, LikeOutlined, StarFilled } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { defaultPathname } from '@/helpers/getDefaultPathname';
import Styles from './style.module.scss';

interface CardUITypes {
  imageUrl: string;
  title: string;
  rating?: number;
  isLike?: boolean;
  id: number;
}

interface PropsTypes {
  data: CardUITypes;
  handleLike?: (id: number) => void;
}

export const CardUI = ({ data, handleLike = () => {} }: PropsTypes) => {
  const {
    title, imageUrl, rating, id, isLike = false,
  } = data;

  const [stateLike, setStateLike] = useState(isLike);

  const pathname = defaultPathname();

  return (
    <div className={Styles.wrap}>
      <Link href={`${pathname}/detail/${id}-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <Image
          width={0}
          height={0}
          unoptimized
          src={imageUrl}
          alt={title}
          priority
          loader={() => `${imageUrl}`}
        />
        <div>
          <p>{title}</p>
          <div>
            <StarFilled />
            {rating}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          setStateLike(!stateLike);
          handleLike(id);
        }}
      >
        {stateLike ? (
          <LikeFilled />
        ) : (
          <LikeOutlined />
        )}
      </button>
    </div>
  );
};
