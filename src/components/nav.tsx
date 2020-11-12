import Link from 'next/link'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'

const SEARCH_NOTE = gql`
	query SearchNote($title: String!) {
		searchNote(title: $title) {
			id
			title
		}
	}
`

export default function Nav() {
	const [isFocus, setIsFocus] = useState(false)
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const [getNotes, { loading, data }] = useLazyQuery(SEARCH_NOTE)

	useEffect(() => {
		if (value.length > 2) {
			getNotes({
				variables: {
					title: value,
				},
			})
		}
	}, [value])
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
		if (event.target.value.length > 2) {
			getNotes({ variables: { title: event.target.value } })
		}
	}

	return (
		<nav
			className="bg-black-2 rounded-sm px-2 text-black-3 w-full relative"
			onClick={() => toggleFocus(true)}
		>
			<div className="overflow-hidden h-10">
				<input
					ref={inputRef}
					type="text"
					className={`transition-opacity duration-500 transform ${
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
			</div>
			<ul className=" bg-gray-400 top-90 z-10 w-full left-0 absolute mt-2 text-indigo-700 px-2">
				{loading ? (
					<span>loading</span>
				) : data ? (
					data.searchNote.map((note) => (
						<Link href={`/note/${note.id}`} key={note.id}>
							<a className="h-8 leading-loose block">{note.title}</a>
						</Link>
					))
				) : null}
			</ul>
		</nav>
	)
}
