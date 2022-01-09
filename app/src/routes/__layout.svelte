<script lang="ts">
	import { verifiedAccount } from '$lib/stores'
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

		verifiedAccount.subscribe((isVerified) => {
			isVerified && toast.push('Verified!')
		})
	})
</script>

<div class="toast-wrap">
	<SvelteToast />
</div>

<div class="container">
	<slot />
</div>
