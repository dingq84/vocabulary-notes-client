import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
// import ReactSwipe from 'react-swipe'

import Nav from '../components/nav'

const RANDOM_NOTES = gql`
	query RandomNotes {
		randomNotes {
			id
			title
		}
	}
`
export default function IndexPage() {
	const { loading, data } = useQuery(RANDOM_NOTES)

	return (
		<div>
			<Nav />
			{loading ? (
				<span>loading</span>
			) : (
				<div className="flex overflow-x-auto snap-type w-full my-8">
					{data.randomNotes.map((note) => (
						<Link href={`/note/${note.id}`} key={note.id}>
							<a className="text-gray-400 inline-flex h-48 w-full bg-gray-700 snap-align flex-shrink-0 items-center justify-center text-2xl">
								{note.title}
							</a>
						</Link>
					))}
				</div>
			)}
			<Link href="/note/update">
				<a className="text-blue-400 text-center capitalize block">
					create new note
				</a>
			</Link>
		</div>
	)
}
