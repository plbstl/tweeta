import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import { expect } from 'chai'
import { Tweeta } from '../target/types/tweeta'

describe('tweeta', () => {
	const provider = anchor.Provider.env()
	anchor.setProvider(provider)

	const baseAccount = anchor.web3.Keypair.generate()
	const program = anchor.workspace.Tweeta as Program<Tweeta>

	it('should initialize the program', async () => {
		const address = provider.wallet.publicKey.toString()
		await program.rpc.initialize(address, {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: anchor.web3.SystemProgram.programId,
			},
			signers: [baseAccount],
		})
	})

	it('should fetch data from base account', async () => {
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)

		expect(account.tweetCount.toNumber()).to.equal(0)
	})

	it('should add a tweet to the program', async () => {
		await program.rpc.addTweet('insert_a_fancy_tweet_here', {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
			},
		})

		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)

		expect(account.tweetCount).to.increase
	})

	it('should confirm that my account is verified', async () => {
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		const walletAddress = provider.wallet.publicKey.toString()
		const verifiedAddresses = account.verifiedAddresses as string[]
		const status = !!verifiedAddresses.find((va) => va === walletAddress)

		expect(status).to.be.true
	})
})
