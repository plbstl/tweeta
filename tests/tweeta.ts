import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { Tweeta } from '../target/types/tweeta'

describe('tweeta', () => {
	// Configure the client to use the local cluster.
	const provider = anchor.Provider.env()
	anchor.setProvider(provider)

	// Create an account keypair for our program to use.
	const baseAccount = anchor.web3.Keypair.generate()

	const program = anchor.workspace.Tweeta as Program<Tweeta>

	it('Is initialized!', async () => {
		const address = provider.wallet.publicKey.toString()
		const tx = await program.rpc.initialize(address, {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			},
			signers: [baseAccount],
		})
		console.log('--- Your transaction signature:', tx)
	})

	it('Has fetched data from the account!', async () => {
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		console.log('--- Tweet Count:', account.tweetCount.toString())
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
		console.log('--- Tweet Count:', account.tweetCount.toString())
		// Access tweets_list on the account!
		console.log('--- Tweet List:', account.tweets)
	})

	it('Showed my account is verified!', async () => {
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		const walletAddress = provider.wallet.publicKey.toString()
		const verifiedAddresses = account.verifiedAddresses as string[]

		const status = !!verifiedAddresses.find((va) => va === walletAddress)

		console.log('--- Wallet Address:', walletAddress)
		console.log('--- Verified Status:', status)

		if (status !== true) {
			throw new Error('Address should be verified!')
		}
	})
})
