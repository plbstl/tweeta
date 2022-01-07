<script lang="ts">
	import Image from 'svelte-image'
	import { fade } from 'svelte/transition'

	export let isOpen: boolean
	export let backBtnDisabled = false
	export let nextBtnDisabled: boolean = false
	export let steps: string[]
	export let imageUrl: string
	export let title: string
	export let prevModal: () => void
	export let nextModal: () => void
</script>

{#if isOpen}
	<div role="dialog" class="modal" transition:fade>
		<div class="contents">
			<h2>{title}</h2>
			<ul>
				{#each steps as step}
					<li>{@html step}</li>
				{/each}
			</ul>

			<div class="img-wrapper">
				<Image
					src={imageUrl}
					alt={title}
					ratio={imageUrl === '/assets/success-prompt.png' ? '80%' : '150%'}
				/>
			</div>

			<div class="actions">
				<button
					class="cta-button instruction-button"
					on:click={prevModal}
					disabled={backBtnDisabled}>Back</button
				>
				<button
					class="cta-button instruction-button"
					on:click={nextModal}
					disabled={nextBtnDisabled}>Next</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.img-wrapper {
		margin: auto;
		width: 65%;
	}

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
		height: 85%;
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
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}
</style>
