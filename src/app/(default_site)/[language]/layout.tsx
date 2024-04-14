import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntdClientProvider from '@/lib/providers/antdProvider';
import '@/assets/styles/globals.scss';
import ReactQueryClientProvider from '@/lib/providers/reactQuery';
import NavbarUI from '@/ui/navbar';
import FooterUI from '@/ui/footer';
import { LanguageTypes } from '@/types';

export const metadata: Metadata = {
  title: {
    template: 'Technical Test %s',
    default: 'Technical Test',
  },
  description: 'Technical Test BNC Web Developer',
};

export const RootLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { language: LanguageTypes }
}>) => (
  <html lang="en">
    <body>
      <ReactQueryClientProvider>
        <AntdRegistry>
          <AntdClientProvider>
            <NavbarUI language={params.language} />
            <div className="mt-[80px]">
              {children}
            </div>
            <FooterUI />
          </AntdClientProvider>
        </AntdRegistry>
      </ReactQueryClientProvider>
    </body>
  </html>
);

export default RootLayout;
