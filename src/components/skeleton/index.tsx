import { cn } from '@/lib/classnames';

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('skelly animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

export { Skeleton };
