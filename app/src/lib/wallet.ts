import { toast } from '@zerodevx/svelte-toast'
import confetti from 'canvas-confetti'
import { walletAddress } from './stores'

export const connectWallet = async (): Promise<void> => {
	const { solana } = window

	if (solana) {
		const response = await solana.connect()
		console.log('Connected with Public Key:', response.publicKey.toString())
		walletAddress.set(response.publicKey.toString())
		confetti({
			particleCount: 100,
			spread: 150,
			origin: { y: 0 },
		})
	}
}

export const checkIfWalletIsConnected = async (): Promise<boolean> => {
	try {
		const { solana } = window

		if (!solana) {
			toast.push('Solana object not found! Get a Phantom Wallet 👻')
			return false
		}

		if (!solana.isPhantom) {
			return false
		}
		console.log('Phantom wallet found!')

		/*
		 * The solana object gives us a function that will allow us to connect
		 * directly with the user's wallet!
		 */
		const response = await solana.connect({ onlyIfTrusted: true })
		console.log('Connected with Public Key:', response.publicKey.toString())
		walletAddress.set(response.publicKey.toString())

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
