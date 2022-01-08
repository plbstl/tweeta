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
			args: []
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
						name: 'totalTweets'
						type: 'u64'
					},
					{
						name: 'tweetsList'
						type: {
							vec: {
								defined: 'TweetStruct'
							}
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
		address: string
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
			args: [],
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
						name: 'totalTweets',
						type: 'u64',
					},
					{
						name: 'tweetsList',
						type: {
							vec: {
								defined: 'TweetStruct',
							},
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
		address: '7SPdoakUcKhbw6GunJ5i3p5KRBcUF7etBQ8yxmsEN3VV',
	},
}
