<script lang="ts">
	import { walletAddress } from '$lib/stores'

	const connectWallet = async () => {
		const { solana } = window

		if (solana) {
			const response = await solana.connect()
			console.log('Connected with Public Key:', response.publicKey.toString())
			walletAddress.set(response.publicKey.toString())
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
	<header class="header-container">
		<p class="header">🐦 Tweeta</p>
		<p class="sub-text">Create tweets in the Metaverse! ✨</p>

		{#if !walletAddress_value}
			<button class="cta-button connect-wallet-button" on:click={connectWallet}>
				Connect to Wallet
			</button>
		{/if}
	</header>

	<footer class="footer-container">
		<p class="footer-text">built with ♥️</p>
	</footer>
</div>
