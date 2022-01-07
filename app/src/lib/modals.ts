import { INSTRUCTIONS } from '$lib/data'
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
