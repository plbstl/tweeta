<script lang="ts">
	import { onMount } from 'svelte'
	import Avatar from './Avatar.svelte'
	import { getTweets, sendTweet } from './solana'
	import { tweets, walletAddress } from './stores'

	let userInput = ''

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
		width: fit-content;
		place-items: end;
	}

	article {
		margin-top: 2rem;
	}

	section {
		width: 90%;
		margin: auto;
		max-width: 900px;
		padding-bottom: 3rem;
	}

	h5 {
		color: #5287ee;
		margin: 1rem 0 0 0.25rem;
	}

	p {
		color: #ccc;
		margin: 0.25rem;
	}

	input[type='text'] {
		display: inline-block;
		color: white;
		padding: 10px;
		width: 70%;
		height: 60px;
		font-size: 16px;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.25);
		border: none;
		border-radius: 10px;
		margin: 50px auto;
	}
</style>
