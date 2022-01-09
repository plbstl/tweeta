#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join, normalize } from 'path'

const DESTINATION = 'app/src/lib/idl.ts'
const srcPath = join(normalize('target/idl/tweeta.json'))
const destPath = join(normalize(DESTINATION))

console.log('run `anchor deploy` before running this script')

try {
	let idl = readFileSync(srcPath, { encoding: 'utf8' })
	idl = idl.replace(/BaseAccount/g, 'baseAccount')

	const fileContent = `export type Tweeta=${idl};export const IDL: Tweeta=${idl}`
	writeFileSync(destPath, fileContent)

	console.log('--- App IDL created:', DESTINATION)
} catch (error) {
	console.log('FAILED! Error:', error.message)
}
