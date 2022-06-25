import Web3 from 'web3'
import Campaign from './build/Campaign.json'

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

export default (address) => {
  return new web3.eth.Contract(Campaign.abi, address)
}
