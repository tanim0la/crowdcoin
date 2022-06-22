import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x1640A912FCe7f10F7b282C14531f6058eD68FF3A',
)

export default instance
