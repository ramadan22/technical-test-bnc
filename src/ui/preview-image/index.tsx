import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/classnames';

interface Props {
  alt: string;
  src: string;
  handleShow: (value: boolean) => void;
}

const PreviewImageUI = ({ alt, src, handleShow }: Props) => {
  let imageType: string = '';
  const img = document.createElement('img');
  img.src = `${src}`;

  imageType = img.width > img.height ? 'landscape' : 'potrait';

  const handleKeyboardEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleShow(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyboardEsc);

    return () => {
      document.body.removeEventListener('keydown', handleKeyboardEsc);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#000000e0] z-10">
      <button
        type="button"
        onClick={() => handleShow(false)}
        className="text-white text-2xl flex gap-x-2 items-center absolute left-0 top-0 m-5"
      >
        <CloseOutlined />
      </button>
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <div
          className={cn(
            'w-auto max-w-full max-h-full rounded p-10',
            imageType === 'landscape' && 'w-full h-auto',
            imageType === 'landscape' && 'w-auto h-full',
          )}
        >
          <Image
            id="image-detail"
            width={0}
            height={0}
            className="w-auto h-full mx-auto rounded"
            src={src}
            loader={() => src}
            alt={alt}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewImageUI;
