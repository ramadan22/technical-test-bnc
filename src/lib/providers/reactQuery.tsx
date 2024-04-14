'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

const ReactQueryClientProvider = ({
  children,
}: Props) => {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 6 * 1000,
          refetchInterval: 6 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
