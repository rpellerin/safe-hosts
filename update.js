const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

const OUTPUT_DIRECTORY = path.resolve(__dirname, 'hosts_files')

const getOutputFilename = filename => path.resolve(OUTPUT_DIRECTORY, filename)

const download = async ({ url, filename }) =>
  new Promise((resolve, reject) => {
    const outputFile = getOutputFilename(filename)
    console.log(`Updating ${outputFile}...`)
    const file = fs.createWriteStream(outputFile)
    const net = url.startsWith('https') ? https : http
    const request = net
      .get(url, response => {
        if (response.statusCode !== 200) {
          console.log(`Encounted error ${response.statusCode} for ${outputFile}`)
          return resolve()
        }
        response.pipe(file)
        file.on('finish', () => file.close(resolve))
      })
      .on('error', err => {
        console.error(`Error while updating ${outputFile}`)
        fs.unlink(outputFile)
        return reject(err)
      })
  })

const update = async list => {
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY)
  }
  for (let i = 0; i < list.length; i++) {
    await download(list[i])
  }
  console.log('DONE')
}

module.exports = {
  getOutputFilename,
  update
}
