import React from 'react'

export const useDisclosure = (defaultValue = false) => {
	const [isOpen, setIsOpen] = React.useState(defaultValue)
	const onClose = () => setIsOpen(false)
	const onOpen = () => setIsOpen(true)
	const onToggle = () => setIsOpen(!isOpen)
	const onChange = (open: boolean) => setIsOpen(open)

	return {
		isOpen,
		onClose,
		onOpen,
		onToggle,
		onChange,
	}
}
