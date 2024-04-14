'use client';

import Image from 'next/image';
import { LeftOutlined, StarFilled } from '@ant-design/icons';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetData } from './hooks/getData';
import Styles from './style.module.scss';
import { cn } from '@/lib/classnames';
import { Skeleton } from '@/components/skeleton';
import PreviewImageUI from '@/ui/preview-image';
import { staticPage } from '@/data/staticPage';
import { LanguageTypes } from '@/types';

interface Props {
  id: number;
  language: LanguageTypes;
}

const LoadingContentDetail = () => (
  <div>
    <span>
      <Skeleton className="lg:w-1/4 w-2/5 h-[35px] bg-gray-200 animate-pulse mb-2.5" />
      <Skeleton className="lg:w-1/3 w-2/5 h-[20px] bg-gray-200 animate-pulse mb-2.5" />
      <span className="flex gap-x-2 lg:w-1/3 w-3/5 mb-2">
        <Skeleton className="w-1/2 h-[30px] bg-gray-200 animate-pulse mb-2" />
        <Skeleton className="w-1/2 h-[30px] bg-gray-200 animate-pulse mb-2" />
      </span>
      <Skeleton className="w-full h-[18px] bg-gray-200 animate-pulse mb-2" />
      <Skeleton className="w-full h-[18px] bg-gray-200 animate-pulse mb-2" />
      <Skeleton className="w-full h-[18px] bg-gray-200 animate-pulse mb-2" />
    </span>
  </div>
);

const DetailMoviesFeature = ({ id, language }: Props) => {
  const router = useRouter();

  const { data: detailMovie, isLoading } = useGetData(id);
  const [isShowImage, setIsShowImage] = useState(false);

  const handleShowImage = (value: boolean) => {
    document.body.style.overflow = value ? 'hidden' : 'auto';
    setIsShowImage(value);
  };

  return (
    <>
      <div
        className={Styles.wrap}
      >
        {isLoading && (
          <Skeleton className={Styles.loadingBanner} />
        )}
        {!isLoading && (
          <>
            <button
              type="button"
              className={Styles.buttonBack}
              onClick={() => router.back()}
            >
              <span>
                <LeftOutlined />
              </span>
              <span>Back</span>
            </button>
            <div
              className={Styles.bgBlur}
              style={{ backgroundImage: `url(${detailMovie?.data?.imageLargeUrl})` }}
            />
          </>
        )}
        <div className={Styles.wrapMovieContent}>
          <div>
            {isLoading && (
              <span>
                <Skeleton className={Styles.loadingImage} />
              </span>
            )}
            {!isLoading && (
              <button
                type="button"
                onClick={() => handleShowImage(true)}
              >
                <Image
                  width={0}
                  height={0}
                  src={`${detailMovie?.data?.imageUrl || ''}`}
                  loader={() => `${detailMovie?.data?.imageUrl || ''}`}
                  alt={detailMovie?.data?.title || ''}
                />
              </button>
            )}
            {isLoading && (
              <LoadingContentDetail />
            )}
            {!isLoading && (
              <div>
                <h1>{detailMovie?.data?.title}</h1>
                <p>{`${detailMovie?.data?.year}, Sutradara`}</p>
                <p>
                  <span>{`${detailMovie?.data?.duration}`}</span>
                  <br />
                  <span>{`${detailMovie?.data?.genre}`}</span>
                </p>
                <p>{detailMovie?.data?.desc}</p>
                <div>
                  <StarFilled />
                  <p>{detailMovie?.data?.rating}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {!isLoading && (
          <div className={cn(Styles.contentParaph, '-mt-[100px]')}>
            <h1>{staticPage[`${language}`].sectionStarringMovie.title}</h1>
            <ul className="list-disc mx-5">
              {detailMovie?.data?.starring?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isShowImage && (
        <PreviewImageUI
          handleShow={(value) => handleShowImage(value)}
          alt={detailMovie?.data?.title || ''}
          src={detailMovie?.data?.imageUrl || ''}
        />
      )}
    </>
  );
};

export default DetailMoviesFeature;
