<script context="module" lang="ts">
	import App from '$lib/App.svelte'
	import ChooseWalletModal from '$lib/ChooseWalletModal.svelte'
	import Modal from '$lib/Modal.svelte'
	import { copyWalletModal } from '$lib/modals'
	import { walletAddress } from '$lib/stores'
	import { closeAllModals, Modals, openModal } from 'svelte-modals'
	import { fade } from 'svelte/transition'

	export const prerender = true
</script>

<svelte:head>
	<title>Tweeta</title>
</svelte:head>

<header>
	<h1>🐦 Tweeta</h1>

	<button
		on:click={() => {
			copyWalletModal(Modal)
		}}
	>
		** Instructions to fund wallet **
	</button>
</header>

<Modals>
	<div slot="backdrop" class="backdrop" transition:fade on:click={closeAllModals} />
</Modals>

<main>
	{#if $walletAddress}
		<App />
	{:else}
		<p class="sub-text">Create tweets in the Metaverse! ✨</p>
		<button
			class="cta-button connect-wallet-button"
			on:click={() => openModal(ChooseWalletModal)}
		>
			Connect to Wallet
		</button>
	{/if}
</main>

<footer>
	<p>built with ♥️ on Solana</p>
</footer>

<style>
	header h1 {
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

	.sub-text {
		font-size: 1.2rem;
		font-weight: normal;
	}
</style>
