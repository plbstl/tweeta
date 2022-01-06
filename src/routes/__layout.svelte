<script lang="ts">
	import { walletAddress } from '$lib/stores'
	import 'sanitize.css'
	import 'sanitize.css/assets.css'
	import 'sanitize.css/forms.css'
	import 'sanitize.css/reduce-motion.css'
	import 'sanitize.css/system-ui.css'
	import 'sanitize.css/typography.css'
	import { onMount } from 'svelte'
	import '../app.css'

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window

			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom wallet found!')

					/*
					 * The solana object gives us a function that will allow us to connect
					 * directly with the user's wallet!
					 */
					const response = await solana.connect({ onlyIfTrusted: true })
					console.log('Connected with Public Key:', response.publicKey.toString())
					walletAddress.set(response.publicKey.toString())
				}
			} else {
				alert('Solana object not found! Get a Phantom Wallet 👻')
			}
		} catch (error) {
			console.error(error)
		}
	}

	onMount(() => {
		const onLoad = async () => {
			await checkIfWalletIsConnected()
		}
		window.addEventListener('load', onLoad)
		return () => window.removeEventListener('load', onLoad)
	})
</script>

<slot />
