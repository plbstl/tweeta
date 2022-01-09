/// <reference types="@sveltejs/kit" />

interface Tweet {
	tweetContent: string
	userAddress: string
}

declare interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	solana?: any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	solflare?: any
}
