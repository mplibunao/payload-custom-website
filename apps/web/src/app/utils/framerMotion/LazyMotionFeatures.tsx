import { LazyMotion } from 'framer-motion'

const loadFeatures = () => import('./domAnimation').then((res) => res.default)

export const LazyMotionDomAnimation = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<LazyMotion features={loadFeatures} strict>
			{children}
		</LazyMotion>
	)
}
