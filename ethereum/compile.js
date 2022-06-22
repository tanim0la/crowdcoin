const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'CampaignFactory.sol': {
      content: source,
    },
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts

//console.log(output['CampaignFactory.sol'].CampaignFactory)
fs.ensureDirSync(buildPath)

for (let contract in output) {
  let a = contract.split('.sol')[0]
  fs.outputJSONSync(path.resolve(buildPath, a + '.json'), output[contract][a])
}
