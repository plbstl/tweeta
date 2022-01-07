/// <reference types="@sveltejs/kit" />

interface Tweet {
	name: string
	content: string
}

declare interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	solana?: any
}
