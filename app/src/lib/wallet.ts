import { toast } from '@zerodevx/svelte-toast'
import confetti from 'canvas-confetti'
import { closeModal } from 'svelte-modals'
import { walletAddress } from './stores'

export const connectWallet = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	walletExtension: any,
	walletExtensionName: string
): Promise<void> => {
	if (!walletExtension) {
		toast.push(`${walletExtensionName} is not installed! 🚨`)
		return
	}

	await walletExtension.connect()
	closeModal()

	if (!walletExtension.isConnected) {
		toast.push('Could not connect wallet. Sorry!')
		return
	}

	const publicKey = walletExtension.publicKey.toString()
	walletAddress.set(publicKey)

	toast.push('Connected!')
	console.log('Connected with Public Key:', publicKey)

	confetti({
		particleCount: 100,
		spread: 150,
		origin: { y: 0 },
	})
}
