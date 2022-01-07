import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Tweeta } from '../target/types/tweeta'

describe('tweeta', () => {
	// Configure the client to use the local cluster.
	const provider = anchor.Provider.env()
	anchor.setProvider(provider)

	// Create an account keypair for our program to use.
	const baseAccount = anchor.web3.Keypair.generate()

	// helpful variables
	const { SystemProgram } = anchor.web3
	const program = anchor.workspace.Tweeta as Program<Tweeta>

	it('Is initialized!', async () => {
		const tx = await program.rpc.initialize({
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			signers: [baseAccount],
		})
		console.log('--- Your transaction signature:', tx)
	})

	it('Has fetched data from the account!', async () => {
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		console.log('--- Tweet Count:', account.totalTweets.toString())
	})

	it('Has added a tweet to the account!', async () => {
		await program.rpc.addTweet('insert_a_fancy_tweet_here', {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
			},
		})
		// Get the account to see change.
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		console.log('--- Tweet Count:', account.totalTweets.toString())
		// Access tweets_list on the account!
		console.log('--- Tweet List:', account.tweetsList)
	})
})
