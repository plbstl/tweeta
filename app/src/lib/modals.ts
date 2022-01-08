import type { SvelteComponentTyped } from 'svelte'
import { openModal } from 'svelte-modals'

type ModalTyped = new (...args: unknown[]) => SvelteComponentTyped<
	{
		isOpen: boolean
		backBtnDisabled?: boolean
		nextBtnDisabled?: boolean
		steps: string[]
		imageUrl: string
		title: string
		prevModal: () => void
		nextModal: () => void
	},
	unknown,
	unknown
>

export const copyWalletModal = (Modal: ModalTyped): void => {
	const INDEX = 0
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		backBtnDisabled: true,
		prevModal: () => {
			return
		},
		nextModal: () => {
			solfaucetModal(Modal)
		},
	})
}

export const solfaucetModal = (Modal: ModalTyped): void => {
	const INDEX = 1
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		prevModal: () => {
			copyWalletModal(Modal)
		},
		nextModal: () => {
			walletNetworkModal(Modal)
		},
	})
}

export const walletNetworkModal = (Modal: ModalTyped): void => {
	const INDEX = 2
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		prevModal: () => {
			solfaucetModal(Modal)
		},
		nextModal: () => {
			selectNetworkModal(Modal)
		},
	})
}

export const selectNetworkModal = (Modal: ModalTyped): void => {
	const INDEX = 3
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		nextBtnDisabled: true,
		prevModal: () => {
			walletNetworkModal(Modal)
		},
		nextModal: () => {
			return
		},
	})
}

export const INSTRUCTIONS = [
	{
		title: `Copy Wallet Address`,
		steps: [
			'Launch the Phantom Wallet extension.',
			'Click on your wallet name to copy the wallet address.',
		],
		imageUrl: '/assets/copy-address.png',
	},
	{
		title: `Visit solfaucet`,
		steps: [
			`Go to <a href='https://solfaucet.com/' target='_blank' class='instruction-link'>https://solfaucet.com</a>`,
			'Input your wallet address. Select <code>Testnet</code> or <code>Devnet</code>.',
			'You will see a success confirmation if all goes well.',
		],
		imageUrl: '/assets/success-prompt.png',
	},
	{
		title: `Change Wallet Network`,
		steps: [
			'Launch the Phantom Wallet extension.',
			'Click on the <code>gear</code> icon to access your settings.',
			'Open <code>Change Network</code> settings.',
		],
		imageUrl: '/assets/network-settings.png',
	},
	{
		title: `Select Network`,
		steps: [
			'Select your preferred network (<code>Testnet</code> or <code>Devnet</code>).',
			' Your balances will reflect the changes.',
		],
		imageUrl: '/assets/select-network.png',
	},
]
