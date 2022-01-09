<script lang="ts">
	import { isAddressVerified } from '$lib/solana'
	import { verifiedAccount, walletAddress } from '$lib/stores'
	import { checkIfWalletIsConnected } from '$lib/wallet'
	import { SvelteToast, toast } from '@zerodevx/svelte-toast'
	import { Buffer } from 'buffer'
	import 'sanitize.css'
	import 'sanitize.css/assets.css'
	import 'sanitize.css/forms.css'
	import 'sanitize.css/reduce-motion.css'
	import 'sanitize.css/system-ui.css'
	import 'sanitize.css/typography.css'
	import { onMount } from 'svelte'
	import '../app.css'

	onMount(() => {
		window.Buffer = Buffer
		const onLoad = async () => {
			const isConnected = await checkIfWalletIsConnected()
			if (isConnected) {
				toast.push('Connected!')
				const status = await isAddressVerified($walletAddress)
				verifiedAccount.set(status)
			}
		}

		verifiedAccount.subscribe((isVerified) => {
			isVerified && toast.push('Verified!')
		})

		window.addEventListener('load', onLoad)
		return () => window.removeEventListener('load', onLoad)
	})
</script>

<div class="toast-wrap">
	<SvelteToast />
</div>

<slot />
