import type { SvelteComponentTyped } from 'svelte'
import { openModal } from 'svelte-modals'

type ModalTyped = new (...args: unknown[]) => SvelteComponentTyped<unknown, unknown, unknown>

export const copyWalletModal = (Modal: ModalTyped): void => {
	const INDEX = 0
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		backBtnDisabled: true,
		prevModal: () => {
			return
		},
		nextModal: () => {
			requestAirdropModal(Modal)
		},
	})
}

export const requestAirdropModal = (Modal: ModalTyped): void => {
	const INDEX = 1
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		prevModal: () => {
			copyWalletModal(Modal)
		},
		nextModal: () => {
			networkSettingsModal(Modal)
		},
	})
}

export const networkSettingsModal = (Modal: ModalTyped): void => {
	const INDEX = 2
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		prevModal: () => {
			requestAirdropModal(Modal)
		},
		nextModal: () => {
			changeNetworkModal(Modal)
		},
	})
}

export const changeNetworkModal = (Modal: ModalTyped): void => {
	const INDEX = 3
	openModal(Modal, {
		...INSTRUCTIONS[INDEX],
		nextBtnDisabled: true,
		prevModal: () => {
			networkSettingsModal(Modal)
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
		title: `Request Airdrop`,
		steps: [
			`Go to <a href='https://solfaucet.com/' target='_blank' class='instruction-link'>https://solfaucet.com</a>`,
			'Input your wallet address. Select <code>Testnet</code> or <code>Devnet</code>.',
			'You will see a success confirmation if all goes well.',
		],
		imageUrl: '/assets/success-prompt.png',
	},
	{
		title: `Go to Network Settings`,
		steps: [
			'Launch the Phantom Wallet extension.',
			'Click on the <code>gear</code> icon to access your settings.',
			'Open <code>Change Network</code> settings.',
		],
		imageUrl: '/assets/network-settings.png',
	},
	{
		title: `Change Network`,
		steps: [
			'Select your preferred network (<code>Testnet</code> or <code>Devnet</code>).',
			' Your balances will reflect the changes.',
		],
		imageUrl: '/assets/select-network.png',
	},
]
