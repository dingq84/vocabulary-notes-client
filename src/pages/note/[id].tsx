import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

const NOTE_DETAIL = gql`
	query NoteDetail($noteId: Int!) {
		noteDetail(noteId: $noteId) {
			id
			title
			url
			sentences {
				meaning
				sentence
			}
		}
	}
`

function Field({ labelName, data }: { labelName: string; data: string }) {
	return (
		<div className="flex flex-col w-full mb-4">
			<span className="tracking-wider text-gray-600 text-sm">{labelName}</span>
			<span className="tracking-wider font-bold mt-2 text-gray-300">
				{data}
			</span>
		</div>
	)
}

export default function View() {
	const router = useRouter()
	const { id } = router.query
	const { data, loading } = useQuery(NOTE_DETAIL, {
		variables: { noteId: parseInt(id as string) },
	})

	return (
		<main>
			<div className="mb-8">
				<h1 className="text-gray-300 text-2xl font-bold text-center">
					單詞明細
				</h1>
			</div>
			<div>
				{loading ? (
					<span>loading</span>
				) : (
					<>
						<Field labelName="單字或片語" data={data.noteDetail.title} />
						{data.noteDetail.sentences.map((sentence, index) => (
							<React.Fragment key={index}>
								<Field labelName={`意思${index + 1}`} data={sentence.meaning} />
								<Field
									labelName={`例句${index + 1}`}
									data={sentence.sentence}
								/>
							</React.Fragment>
						))}

						<a
							className="text-blue-400 mt-8 block"
							href={data.noteDetail.url}
							target="_blank"
						>
							出處
						</a>
					</>
				)}
			</div>
		</main>
	)
}
