import React from 'react'

export const useDisclosure = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const onToggle = () => setIsOpen(!isOpen)

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle,
	}
}
