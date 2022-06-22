const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
require('dotenv').config()

const provider = new HDWalletProvider(process.env.PHRASE, process.env.NETWORK)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '2000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
  provider.engine.stop()
}
deploy()

//0x1640A912FCe7f10F7b282C14531f6058eD68FF3A
