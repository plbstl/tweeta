<script lang="ts">
	import { onMount } from 'svelte'
	import Avatar from './Avatar.svelte'
	import { getTweets, sendSol, sendTweet } from './solana'
	import { tweets, walletAddress } from './stores'

	let userInput = ''
	let solAmount: number

	onMount(async () => {
		await getTweets()
	})
</script>

<section>
	<form
		on:submit|preventDefault={async () => {
			const sent = await sendTweet($walletAddress, userInput)
			if (sent) {
				userInput = ''
			}
		}}
	>
		<input type="text" bind:value={userInput} placeholder="What's happening ..." />
		<button type="submit" class="cta-button submit-tweet-button">Tweet</button>
	</form>

	<form
		on:submit|preventDefault={async () => {
			const sent = await sendSol(solAmount)
			if (sent) {
				solAmount = null
			}
		}}
	>
		<input type="number" bind:value={solAmount} placeholder="Amount" />
		<button type="submit" class="cta-button submit-sol-button">Send</button>
	</form>

	{#each $tweets as { userAddress, tweetContent }}
		<article>
			<a
				class="owner"
				href={`https://explorer.solana.com/address/${userAddress}/domains?cluster=devnet`}
				rel="external"
				target="_blank"
			>
				<Avatar
					size={25}
					address={userAddress}
					colors={[
						'#F7EAD9',
						'#6D997A',
						'#84ABAA',
						'#DED1B6',
						'#6CA19E',
						'#F5BA90',
						'#FF9A52',
						'#C0D860',
					]}
				/>

				<h5>{userAddress}</h5>
			</a>
			<p>{tweetContent}</p>
		</article>
	{/each}
</section>

<style>
	.owner {
		display: flex;
		place-items: center;
	}

	article {
		margin-top: 2rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	section {
		width: 90%;
		margin: auto;
		max-width: 900px;
		padding-bottom: 3rem;
	}

	h5 {
		color: #5287ee;
		margin: 0 0 0 0.5rem;
	}

	p {
		color: #ccc;
		margin: 0.25rem;
		text-align: initial;
		font-size: 0.8rem;
		padding: 0.25rem 0 0 1.25rem;
	}

	input {
		display: inline-block;
		background-color: rgba(0, 0, 0, 0.25);
		color: white;
		border: none;
	}

	input[type='text'] {
		padding: 10px;
		width: 70%;
		height: 60px;
		font-size: 16px;
		border-radius: 10px;
		margin: 50px auto;
	}

	input[type='number'] {
		padding: 6px 10px;
		font-size: 11px;
	}
</style>
