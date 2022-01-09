import { writable } from 'svelte/store'

export const walletAddress = writable<string>('')

export const tweets = writable<Tweet[]>([])

export const verifiedAccount = writable<boolean>(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const walletExtension = writable<any>({})
