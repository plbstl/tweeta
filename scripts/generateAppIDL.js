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
	writeFileSync(destPath, structureIDLFile(idl))
	console.log('--- App IDL created:', DESTINATION)
} catch (error) {
	console.log('FAILED! Error:', error.message)
}

/**
 *
 * @param {string} idl
 * @returns Buffer
 */
function structureIDLFile(idl) {
	const idlBuffer = Buffer.from(idl)
	const TweetaDeclaration = Buffer.from('export type Tweeta =')
	const IDLDeclaration = Buffer.from('export const IDL: Tweeta =')
	const semiColon = Buffer.from(';')
	return Buffer.concat([TweetaDeclaration, idlBuffer, semiColon, IDLDeclaration, idlBuffer])
}
