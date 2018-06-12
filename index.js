#!/usr/bin/env node
const { spawn } = require('child_process')
const path = require('path')
const program = require('commander')
const { update, getOutputFilename } = require('./update')

const DOWNLOAD_LIST = require('./list.json')

const runWithOutput = async (string, args = []) =>
  new Promise(resolve => {
    const [cmd, ...args2] = string.split(' ')
    const proc = spawn(cmd, [...args2, ...args])

    proc.stdout.on('data', data => process.stdout.write(data))
    proc.stderr.on('data', data => process.stderr.write(data))

    proc.on('close', code => resolve(code))
  })

program
  .version('0.1.0')
  .option('-p, --protect-me', 'Protect you while browsing')
  .option('-d, --unprotect-me', 'YOLO')
  .option('-u, --update', 'Update hosts files')
  .parse(process.argv)

const protectMe = async () => {
  const files = DOWNLOAD_LIST.map(({ filename }) => getOutputFilename(filename))
  const script = path.resolve(__dirname, 'scripts', 'protect-me.sh')
  await runWithOutput(script, files)
  console.log('Done')
}

if (program.protectMe) {
  protectMe()
} else if (program.unprotectMe) {
  console.log('sudo cp /etc/hosts.initial.backup /etc/hosts')
} else if (program.update) {
  update(DOWNLOAD_LIST)
}
