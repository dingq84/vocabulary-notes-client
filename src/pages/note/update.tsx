import { useForm } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'

const CREATE_NOTE = gql`
	mutation CreateNote(
		$title: String!
		$url: String!
		$sentences: [SentenceInput]
	) {
		createNote(title: $title, url: $url, sentences: $sentences)
	}
`

function Field({
	labelName,
	name,
	forwardRef,
	errors,
}: {
	labelName: string
	name: string
	forwardRef: any
	errors: any
}) {
	return (
		<label className="text-gray-400 font-bold capitalize mb-2 block relative">
			{labelName}
			<input
				type="text"
				name={name}
				ref={forwardRef}
				className=" border border-gray-400 border-solid rounded-md my-2"
			/>
			{errors[name] && (
				<span className="text-red-400 text-xs absolute left-0 top-90">
					This field is required
				</span>
			)}
		</label>
	)
}

export default function UpdateNote() {
	const { register, handleSubmit, errors } = useForm<{
		title: string
		url: string
		meaning1: string
		sentence1: string
		meaning2: string
		sentence2: string
	}>()
	const [createNote, { data }] = useMutation(CREATE_NOTE)

	const onSubmit = handleSubmit((data): void => {
		const { meaning1, meaning2, sentence1, sentence2, title, url } = data
		const sentences: { meaning: string; sentence: string }[] = []
		if (meaning1 && sentence1) {
			sentences.push({ meaning: meaning1, sentence: sentence1 })
		}

		if (meaning2 && sentence2) {
			sentences.push({ meaning: meaning2, sentence: sentence2 })
		}

		createNote({ variables: { title, url, sentences } })
	})

	return (
		<main>
			<div className="mb-8">
				<h1 className="text-gray-300 text-2xl font-bold text-center">
					新增單詞
				</h1>
			</div>
			<form onSubmit={onSubmit}>
				<Field
					labelName="單字或片語"
					name="title"
					forwardRef={register({ required: true })}
					errors={errors}
				/>
				<Field
					labelName="連結出處"
					name="url"
					forwardRef={register({ required: true })}
					errors={errors}
				/>
				<Field
					labelName="意思1"
					name="meaning1"
					forwardRef={register({ required: true })}
					errors={errors}
				/>
				<Field
					labelName="例句1"
					name="sentence1"
					forwardRef={register({ required: true })}
					errors={errors}
				/>
				<Field
					labelName="意思2"
					name="meaning2"
					forwardRef={register}
					errors={errors}
				/>
				<Field
					labelName="例句2"
					name="sentence2"
					forwardRef={register}
					errors={errors}
				/>
				<input
					type="submit"
					value="新增"
					className="text-gray-300 bg-blue-400 rounded-md mt-4"
				/>
			</form>
		</main>
	)
}
