<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
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
	})
</script>

<div class="toast-wrap">
	<SvelteToast />
</div>

<div class="container">
	<slot />
</div>
