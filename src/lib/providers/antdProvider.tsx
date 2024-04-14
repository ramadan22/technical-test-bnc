import { ConfigProvider } from 'antd';

type Props = {
  children?: React.ReactNode;
};

const AntdClientProvider = ({
  children,
}: Props) => (
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'DMSans, sans',
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default AntdClientProvider;
