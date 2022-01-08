#!/usr/bin/env node

import { web3 } from '@project-serum/anchor'
import { writeFileSync } from 'fs'
import { join, normalize } from 'path'

const account = web3.Keypair.generate()
const KEYPAIR_PATH = 'app/src/lib/keypair.json'

try {
	writeFileSync(join(normalize(KEYPAIR_PATH)), JSON.stringify(account))
	console.log('--- New keypair created:', KEYPAIR_PATH)
} catch (error) {
	console.log('FAILED! Error:', error.message)
}
