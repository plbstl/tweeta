import { Program, Provider, web3 } from '@project-serum/anchor'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { toast } from '@zerodevx/svelte-toast'
import { IDL } from './idl'
import { _keypair } from './keypair.json'
import { tweets, verifiedAccount } from './stores'

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3

// Create a keypair for the account that will hold the tweets.
const secret = new Uint8Array(Object.values(_keypair.secretKey))
const baseAccount = Keypair.fromSecretKey(secret)

// Get our program's id from the IDL file.
const programID = new PublicKey(IDL.metadata.address)

// Set our network to devnet.
const network = clusterApiUrl('devnet')

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
	preflightCommitment: 'processed' as const,
}

const getProvider = () => {
	const connection = new Connection(network, opts.preflightCommitment)
	const provider = new Provider(connection, window.solana, {
		preflightCommitment: opts.preflightCommitment,
	})
	return provider
}

export const createTweetaAccount = async (): Promise<void> => {
	try {
		const provider = getProvider()
		const program = new Program(IDL, programID, provider)
		console.log('ping')
		await program.rpc.initialize({
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			signers: [baseAccount],
		})
		verifiedAccount.set(true)
		console.log('Created a new BaseAccount w/ address:', baseAccount.publicKey.toString())
		await getTweets()
	} catch (error) {
		console.log('Error creating BaseAccount account:', error)
	}
}

export const getTweets = async (): Promise<void> => {
	try {
		const provider = getProvider()
		const program = new Program(IDL, programID, provider)
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)

		console.log('Got the account', account)
		tweets.set(account.tweets as Tweet[])
	} catch (error) {
		console.log('Error in getTweets: ', error)
		tweets.set([])
	}
}

export const sendTweet = async (address: string, content: string): Promise<boolean> => {
	content = content.trim()

	if (content.length < 1) {
		toast.push('Tweet cannot be empty fam!')
		return false
	}

	// @todo:
	// haven't sent to solana network yet
	tweets.update((olderTweets) => [{ address, content }, ...olderTweets])

	// if error
	// toast.push('Cannot send tweet at the moment!')

	toast.push(`You tweeted "${content}"`)
	return true
}
