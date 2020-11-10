import Nav from './nav'

export default function Layout({ children }) {
	return (
		<div className="h-screen w-screen px-6 py-10 bg-black-1">
			<Nav />
			{children}
		</div>
	)
}
