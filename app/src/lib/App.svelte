<script lang="ts">
	import Avatar from '$lib/Avatar.svelte'
	import { toast } from '@zerodevx/svelte-toast'
	import { TEST_TWEETS } from './data'
	import { walletAddress } from './stores'

	let name: string
	let content = ''
	let tweets: Tweet[] = []

	const sendTweet = async () => {
		content = content.trim()

		if (content.length < 1) {
			toast.push('Tweet cannot be empty fam!')
			return
		}

		tweets = [{ name, content }, ...tweets]
		toast.push(`You tweeted "${content}"`)
		content = ''
	}

	walletAddress.subscribe((value) => {
		if (value) {
			name = value
			console.log('Fetching tweets ...')

			// Call Solana program here.

			// Set state
			tweets = TEST_TWEETS
		}
	})
</script>

<section>
	<form on:submit|preventDefault={sendTweet}>
		<input type="text" bind:value={content} placeholder="What's happening ..." />
		<button type="submit" class="cta-button submit-tweet-button">Tweet</button>
	</form>

	{#each tweets as { name, content }}
		<article>
			<a
				class="owner"
				href={`https://explorer.solana.com/address/${name}/domains?cluster=testnet`}
			>
				<Avatar
					size={25}
					{name}
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

				<h5>{name}</h5>
			</a>
			<p>{content}</p>
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
