import { toast } from '@zerodevx/svelte-toast'
import confetti from 'canvas-confetti'
import { closeModal } from 'svelte-modals'
import { isAddressVerified } from './solana'
import { verifiedAccount, walletAddress } from './stores'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectWallet = async (walletExtension: any): Promise<void> => {
	if (!walletExtension) {
		return
	}

	try {
		await walletExtension.connect()
		closeModal()
	} catch {
		closeModal()
		toast.push('Could not connect wallet. Sorry!')
		return
	}

	if (!walletExtension.isConnected) {
		toast.push('Could not connect wallet. Sorry!')
		return
	}

	const publicKey = walletExtension.publicKey.toString()
	walletAddress.set(publicKey)

	toast.push('Connected!')
	console.log('Connected with Public Key:', publicKey)

	// check verification status
	const isVerified = await isAddressVerified(publicKey)
	verifiedAccount.set(isVerified)

	confetti({
		particleCount: 100,
		spread: 150,
		origin: { y: 0 },
	})
}
