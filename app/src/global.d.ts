/// <reference types="@sveltejs/kit" />

interface Tweet {
	address: string
	content: string
}

declare interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	solana?: any
}
