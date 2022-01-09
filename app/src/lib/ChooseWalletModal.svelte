<svelte:options immutable />

<script>
	import { fade } from 'svelte/transition'
	import { connectWallet } from './wallet'

	export let isOpen = false
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:fade>
		<div class="contents">
			<h2>Choose Wallet</h2>

			<div class="actions">
				<button
					class="cta-button instruction-button"
					on:click={() => connectWallet(window.solana, 'Phantom')}
				>
					<img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" />
				</button>
				<button
					class="cta-button instruction-button"
					on:click={() => connectWallet(window.solflare, 'Solflare')}
				>
					<img
						src="https://solflare.com/assets/logo-icon.26659b6d.svg"
						alt=""
						style="height: 80%;"
					/>
					Solflare
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		min-width: 240px;
		border-radius: 6px;
		padding: 16px;
		background: #1a202c;
		overflow-y: scroll;
		max-height: 85%;
		width: 80%;
		max-width: 700px;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	.actions {
		margin-top: 32px;
		display: grid;
		gap: 10px;
	}

	button {
		font-size: 1.5rem;
		height: 64px;
	}
</style>
