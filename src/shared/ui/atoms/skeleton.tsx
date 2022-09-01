type SkeletonProps = {
  className?: string
  children?: React.ReactNode
}

export const Skeleton = ({ children, className = '' }: SkeletonProps) => {
  return (
    <article
      className={`h-44 flex-shrink-0 bg-darkBlue-400 box-border rounded-xl animate-pulse ${className}`}
    >
      {children}
    </article>
  )
}

type SkeletonGroupProps = {
  amount: number
  className?: string
  skeletonClassName?: string
}
export const SkeletonGroup = ({
  amount,
  className = '',
  skeletonClassName = '',
}: SkeletonGroupProps) => (
  <div className={`grid grid-cols-2 gap-2 w-full ${className}`}>
    {Array.from({ length: amount }, (_, idx) => (
      <Skeleton key={idx} className={skeletonClassName} />
    ))}
  </div>
)
