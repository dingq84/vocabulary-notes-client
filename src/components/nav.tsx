import { ChangeEvent, useRef, useState } from 'react'

export default function Nav() {
	const [isFocus, setIsFocus] = useState(false)
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const toggleFocus = (focus: boolean): void => {
		if (focus) {
			inputRef.current.focus()
		} else {
			setValue('')
		}
		setIsFocus(focus)
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value)
	}

	return (
		<nav
			className="bg-black-2 rounded-sm px-2 text-black-3 h-10 overflow-hidden w-full"
			onClick={() => toggleFocus(true)}
		>
			<input
				ref={inputRef}
				type="text"
				className={`w-full h-full bg-transparent p-2 text-xs focus:outline-none border-none transition-opacity duration-500 transform ${
					isFocus ? 'opacity-100' : 'opacity-0'
				}`}
				value={value}
				onChange={handleChange}
				onBlur={() => toggleFocus(false)}
			/>
			<div
				className={`flex h-full items-center transition-transform duration-500 transform ${
					isFocus ? 'translate-y-0' : '-translate-y-10'
				}`}
			>
				<svg className="w-4 h-4 fill-current mr-2">
					<use xlinkHref="sprite.svg#search"></use>
				</svg>
				<span className="text-sm">Search...</span>
			</div>
		</nav>
	)
}
