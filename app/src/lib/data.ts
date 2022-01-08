export const TEST_TWEETS: Tweet[] = [
	{
		address: '5Jaqykse5Aya5219Pg',
		content: 'just settin up my tweeta',
	},
	{
		address: 'L71a8LW2UrKwPaWNYM',
		content: 'If you get stuck, reach out for help in the Discord chatroom.',
	},
	{
		address: 'eIG0HfouRQJQr1wBzz',
		content:
			'From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel',
	},
	{
		address: 'AeFmQjHMtEySooOc8K',
		content:
			'For example, our hypothetical blog page, might request data from "A" which could be represented by a "B" endpoint',
	},
	{
		address: 'PAqjdPkJLDsmBRSYUp',
		content:
			'SvelteKit is in early development, and some things may change before we hit version 1.0.',
	},
	{
		address: 'hhY2rhDgRXxXaZ7NWL',
		content:
			'If an error component has a load function, it will be called with error and status properties:',
	},
	{
		address: 'e5Aya527NWLsMmTRAb',
		content:
			"So far, we've treated pages as entirely standalone components — upon navigation, the existing component will be destroyed, and a new one will take its place.",
	},
]

export const INSTRUCTIONS = [
	{
		title: `Copy Wallet Address`,
		steps: [
			'Launch the Phantom Wallet extension.',
			'Click on your wallet name to copy the wallet address.',
		],
		imageUrl: '/assets/copy-address.png',
	},
	{
		title: `Visit solfaucet`,
		steps: [
			`Go to <a href='https://solfaucet.com/' target='_blank' class='instruction-link'>https://solfaucet.com</a>`,
			'Input your wallet address. Select <code>Testnet</code> or <code>Devnet</code>.',
			'You will see a success confirmation if all goes well.',
		],
		imageUrl: '/assets/success-prompt.png',
	},
	{
		title: `Change Wallet Network`,
		steps: [
			'Launch the Phantom Wallet extension.',
			'Click on the <code>gear</code> icon to access your settings.',
			'Open <code>Change Network</code> settings.',
		],
		imageUrl: '/assets/network-settings.png',
	},
	{
		title: `Select Network`,
		steps: [
			'Select your preferred network (<code>Testnet</code> or <code>Devnet</code>).',
			' Your balances will reflect the changes.',
		],
		imageUrl: '/assets/select-network.png',
	},
]
