'use client';

import { Heading } from '@/components/heading';

const ParagraphUI = ({ title, text }: { title: string, text: string }) => (
  <>
    <Heading type="h1">
      {title}
    </Heading>
    <p>{text}</p>
  </>
);

export default ParagraphUI;
