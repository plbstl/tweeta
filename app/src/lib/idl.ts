export type Tweeta = {
	version: '0.1.0'
	name: 'tweeta'
	instructions: [
		{
			name: 'initialize'
			accounts: [
				{
					name: 'baseAccount'
					isMut: true
					isSigner: true
				},
				{
					name: 'user'
					isMut: true
					isSigner: true
				},
				{
					name: 'systemProgram'
					isMut: false
					isSigner: false
				}
			]
			args: [
				{
					name: 'address'
					type: 'string'
				}
			]
		},
		{
			name: 'addTweet'
			accounts: [
				{
					name: 'baseAccount'
					isMut: true
					isSigner: false
				},
				{
					name: 'user'
					isMut: true
					isSigner: true
				}
			]
			args: [
				{
					name: 'tweetContent'
					type: 'string'
				}
			]
		}
	]
	accounts: [
		{
			name: 'baseAccount'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'tweetCount'
						type: 'u64'
					},
					{
						name: 'tweets'
						type: {
							vec: {
								defined: 'TweetStruct'
							}
						}
					},
					{
						name: 'verifiedAddresses'
						type: {
							vec: 'string'
						}
					}
				]
			}
		}
	]
	types: [
		{
			name: 'TweetStruct'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'tweetContent'
						type: 'string'
					},
					{
						name: 'userAddress'
						type: 'publicKey'
					}
				]
			}
		}
	]
	metadata: {
		address: '9GUcf7ZYVkn2xXM7ZRpTnZu35ktfvXT4Q2RgG2dDXGgs'
	}
}
export const IDL: Tweeta = {
	version: '0.1.0',
	name: 'tweeta',
	instructions: [
		{
			name: 'initialize',
			accounts: [
				{
					name: 'baseAccount',
					isMut: true,
					isSigner: true,
				},
				{
					name: 'user',
					isMut: true,
					isSigner: true,
				},
				{
					name: 'systemProgram',
					isMut: false,
					isSigner: false,
				},
			],
			args: [
				{
					name: 'address',
					type: 'string',
				},
			],
		},
		{
			name: 'addTweet',
			accounts: [
				{
					name: 'baseAccount',
					isMut: true,
					isSigner: false,
				},
				{
					name: 'user',
					isMut: true,
					isSigner: true,
				},
			],
			args: [
				{
					name: 'tweetContent',
					type: 'string',
				},
			],
		},
	],
	accounts: [
		{
			name: 'baseAccount',
			type: {
				kind: 'struct',
				fields: [
					{
						name: 'tweetCount',
						type: 'u64',
					},
					{
						name: 'tweets',
						type: {
							vec: {
								defined: 'TweetStruct',
							},
						},
					},
					{
						name: 'verifiedAddresses',
						type: {
							vec: 'string',
						},
					},
				],
			},
		},
	],
	types: [
		{
			name: 'TweetStruct',
			type: {
				kind: 'struct',
				fields: [
					{
						name: 'tweetContent',
						type: 'string',
					},
					{
						name: 'userAddress',
						type: 'publicKey',
					},
				],
			},
		},
	],
	metadata: {
		address: '9GUcf7ZYVkn2xXM7ZRpTnZu35ktfvXT4Q2RgG2dDXGgs',
	},
}
