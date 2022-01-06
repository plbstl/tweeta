<script lang="ts">
	import App from '$lib/App.svelte'
	import { walletAddress } from '$lib/stores'
	import confetti from 'canvas-confetti'

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
	<meta name="title" content="Tweeta" />
	<meta property="og:title" content="Tweeta" />
</svelte:head>

<div class="container">
	<header>
		<p>🐦 Tweeta</p>
	</header>

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
	header {
		font-size: 50px;
		font-weight: bold;
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

	.container {
		min-height: 100vh;
		background-color: #1a202c;
		overflow: scroll;
		color: #dadfdd;
		padding-left: 4px;
	}

	.sub-text {
		font-size: 25px;
		font-weight: normal;
	}
</style>
