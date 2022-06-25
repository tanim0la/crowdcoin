import Web3 from 'web3'
import CampaignFactory from './build/CampaignFactory.json'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
  )
  web3 = new Web3(provider)
}

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x1640A912FCe7f10F7b282C14531f6058eD68FF3A',
)

export default instance
