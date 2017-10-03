#!/usr/bin/env node

const serve = require('./../src/server')
const argv = require('yargs')
	.option('p', {
		alias: 'port',
		type: 'number',
		default: 44190 // clisson
	})
	.option('b', {
		alias: 'browser',
		type: 'boolean',
		default: false
	})
	.argv

serve(argv)
