<script lang="ts">
	import App from '$lib/App.svelte'
	import { INSTRUCTIONS } from '$lib/data'
	import Modal from '$lib/Modal.svelte'
	import { walletAddress } from '$lib/stores'
	import confetti from 'canvas-confetti'
	import { closeAllModals, Modals, openModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'

	const copyWalletModal = () => {
		const INDEX = 0
		openModal(Modal, {
			...INSTRUCTIONS[INDEX],
			backBtnDisabled: true,
			prevModal: () => {},
			nextModal: () => {
				solfaucetModal()
			},
		})
	}

	const solfaucetModal = () => {
		const INDEX = 1
		openModal(Modal, {
			...INSTRUCTIONS[INDEX],
			prevModal: () => {
				copyWalletModal()
			},
			nextModal: () => {
				walletNetworkModal()
			},
		})
	}

	const walletNetworkModal = () => {
		const INDEX = 2
		openModal(Modal, {
			...INSTRUCTIONS[INDEX],
			prevModal: () => {
				solfaucetModal()
			},
			nextModal: () => {
				selectNetworkModal()
			},
		})
	}

	const selectNetworkModal = () => {
		const INDEX = 3
		openModal(Modal, {
			...INSTRUCTIONS[INDEX],
			nextBtnDisabled: true,
			prevModal: () => {
				walletNetworkModal()
			},
			nextModal: () => {},
		})
	}

	const connectWallet = async () => {
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

	let walletAddress_value: string

	walletAddress.subscribe((value) => {
		walletAddress_value = value
	})
</script>

<svelte:head>
	<title>Tweeta</title>
</svelte:head>

<div class="container">
	<header>
		<p>🐦 Tweeta</p>

		<button
			on:click={() => {
				copyWalletModal()
			}}
		>
			** Instructions to fund wallet **
		</button>
	</header>

	<Modals>
		<div slot="backdrop" class="backdrop" transition:fade on:click={closeAllModals} />
	</Modals>

	<!-- @todo: add option to disconnect wallet -->

	{#if walletAddress_value}
		<App />
	{:else}
		<main>
			<p class="sub-text">Create tweets in the Metaverse! ✨</p>
			<button class="cta-button connect-wallet-button" on:click={connectWallet}>
				Connect to Wallet
			</button>
		</main>
	{/if}

	<footer>
		<p>built with ♥️ on Solana</p>
	</footer>
</div>

<style>
	header p {
		font-size: 50px;
		font-weight: bold;
	}

	header button {
		font-size: 0.85rem;
		background: -webkit-linear-gradient(left, #171b22, #13161f);
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	header,
	main,
	footer {
		text-align: center;
	}

	footer {
		font-size: 16px;
		margin-top: auto;
		width: 100%;
		color: #9cb5e7;
		padding-bottom: 1.5rem;
		font-weight: bold;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.container {
		min-height: 100vh;
		background-color: #1a202c;
		overflow: hidden;
		color: #dadfdd;
	}

	.sub-text {
		font-size: 25px;
		font-weight: normal;
	}
</style>
