import { Suspense } from 'react'
import { cn } from '~/app/utils/misc.ts'

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-primary/10', className)}
			{...props}
		/>
	)
}

const SuspendSkeleton = (props: { children?: React.ReactNode }) => {
	return (
		<Suspense
			fallback={
				<div className='w-full flex items-center space-x-4 justify-center md:py-5 py-2'>
					<Skeleton className='h-12 w-12 rounded-full md:h-20 md:w-20' />
					<div className='space-y-2 md:space-y-3'>
						<Skeleton className='h-4 w-[250px] md:h-6 md:w-96' />
						<Skeleton className='h-4 w-[200px] md:h-6 md:w-80' />
					</div>
				</div>
			}
		>
			{props.children}
		</Suspense>
	)
}

export { Skeleton, SuspendSkeleton }
