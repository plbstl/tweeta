import { Program, Provider, web3 } from '@project-serum/anchor'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { toast } from '@zerodevx/svelte-toast'
import { IDL } from './idl'
import { _keypair } from './keypair.json'
import { tweets, verifiedAccount } from './stores'

// Create a keypair for the account that will hold the tweets.
const secret = new Uint8Array(Object.values(_keypair.secretKey))
const baseAccount = web3.Keypair.fromSecretKey(secret)

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
		await program.rpc.initialize(provider.wallet.publicKey.toString(), {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: web3.SystemProgram.programId,
			},
			signers: [baseAccount],
		})
		verifiedAccount.set(true)
		console.log('Created a new BaseAccount w/ address:', baseAccount.publicKey.toString())
		await getTweets()
	} catch (error) {
		toast.push('Try reloading page')
		console.log('Error creating BaseAccount account:', error)
	}
}

export const isAddressVerified = async (address: string): Promise<boolean> => {
	try {
		const provider = getProvider()
		const program = new Program(IDL, programID, provider)
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)
		const verifiedAddresses = account.verifiedAddresses as string[]
		return !!verifiedAddresses.find((va) => va === address)
	} catch (error) {
		console.log('Error getting verified status: ', error)
		return false
	}
}

export const getTweets = async (): Promise<void> => {
	try {
		const provider = getProvider()
		const program = new Program(IDL, programID, provider)
		const account = await program.account.baseAccount.fetch(baseAccount.publicKey)

		// @todo: need timestamp
		const chronologicalTweets = account.tweets as Tweet[]
		chronologicalTweets.reverse()

		tweets.set(chronologicalTweets)
	} catch (error) {
		console.log('Error retrieving tweets: ', error)
		tweets.set([])
	}
}

export const sendTweet = async (userAddress: string, userInput: string): Promise<boolean> => {
	userInput = userInput.trim()

	if (userInput.length < 1) {
		toast.push('Tweet cannot be empty fam!')
		return false
	}

	try {
		const provider = getProvider()
		const program = new Program(IDL, programID, provider)

		await program.rpc.addTweet(userInput, {
			accounts: {
				baseAccount: baseAccount.publicKey,
				user: provider.wallet.publicKey,
			},
		})

		tweets.update((olderTweets) => [{ userAddress, tweetContent: userInput }, ...olderTweets])
		return true
	} catch (error) {
		toast.push('Can not send tweet at the moment!')
		console.log(error)
		return false
	}
}
