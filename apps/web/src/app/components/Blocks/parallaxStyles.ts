import { cva } from 'cva'

export const parallaxStyles = cva([
	'transition-transform duration-700 ease-out delay-0 sm:duration-300',
])

const parallaxTranslateY = {
	50: ['25%', '-10%'], // index 1 can be 0 or closer to -25%
	100: ['25%', '-25%'],
	150: ['25%', '-75%'],
}
type Distance = keyof typeof parallaxTranslateY

export const getParallaxTranslateYOutput = (distance: Distance = 50) => {
	return parallaxTranslateY[distance]
}
