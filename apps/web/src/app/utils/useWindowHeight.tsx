import React from 'react'

type Listener = () => void
const listeners = new Set<Listener>()

let currentHeight = window.innerHeight

function subscribe(listener: Listener) {
	listeners.add(listener)
	return () => {
		listeners.delete(listener)
	}
}

function getSnapshot() {
	return currentHeight
}

function getServerSnapshot() {
	return 0
}

function resizeHandler() {
	currentHeight = window.innerHeight
	listeners.forEach((listener) => listener())
}

window.addEventListener('resize', resizeHandler)

export function useWindowHeight() {
	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
