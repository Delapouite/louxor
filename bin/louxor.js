#!/usr/bin/env node

const serve = require('./../src/server')

serve(Number(process.argv[2]) || 44190)
