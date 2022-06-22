const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')
//const { it } = require('mocha')

let accounts, factory, campaignAddress, campaign

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '2000000' })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '2000000',
  })

  const address = await factory.methods.getDeployedCampaigns().call()
  campaignAddress = address[0]
  //console.log(campaignAddress)

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)
})

describe('Campaigns', () => {
  it('deploys factory and campaign', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('checks if caller is manager', async () => {
    const manager = await campaign.methods.manager().call()

    assert.equal(accounts[0], manager)
  })

  it('contributes and add to approvers mapping', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1],
    })

    const isPresent = await campaign.methods.approvers(accounts[1]).call()

    assert(isPresent)
  })

  it('creates, approves and fanalize request', async () => {
    //create request
    await campaign.methods.createRequest('phone', '100', accounts[3]).send({
      from: accounts[0],
      gas: '2000000',
    })

    //contribute
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[2],
    })

    //approve request
    await campaign.methods.approveRequest(0).send({
      from: accounts[2],
      gas: '2000000',
    })

    // finalize request
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: 2000000,
    })

    const requests = await campaign.methods.requests(0).call()

    assert(requests.complete)
  })
})
