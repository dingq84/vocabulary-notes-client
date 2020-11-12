import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactChild }) {
	const router = useRouter()

	return (
		<div className="h-screen w-screen px-6 py-10 bg-black-1 relative">
			<div
				className={`transition-opacity will-update absolute text-blue-600 duration-500 ${
					router.pathname !== '/' ? 'opacity-1' : 'opacity-0'
				}`}
			>
				<button
					className="w-12 text-xl font-bold text-left"
					onClick={() => router.back()}
				>
					&#60;
				</button>
			</div>
			{children}
		</div>
	)
}
