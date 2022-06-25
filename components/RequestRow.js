import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Web3 from 'web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class RequestRow extends Component {
  onApprove = async () => {
    let web3 = new Web3(window.ethereum)

    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    })

    Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
  }

  onFinalize = async () => {
    let web3 = new Web3(window.ethereum)

    const campaign = Campaign(this.props.address)
    const accounts = await web3.eth.getAccounts()

    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    })

    Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
  }

  render() {
    const { id, request, approversCount } = this.props
    const readyToFinalize = request.approvalCount > approversCount / 2

    //We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
    )
    let web3 = new Web3(provider)

    return (
      <tr
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
        className="border-b"
      >
        <td className="text-base text-gray-900 sm:text-lg  font-light px-6 py-4 whitespace-nowrap border-r">
          {id + 1}
        </td>
        <td className="text-base text-gray-900 sm:text-lg  font-light px-6 py-4 whitespace-normal border-r">
          {request.description}
        </td>
        <td className="text-base text-gray-900 sm:text-lg  font-light px-6 py-4 whitespace-nowrap border-r">
          {web3.utils.fromWei(request.value, 'ether')}
        </td>
        <td className="text-base text-gray-900 sm:text-lg font-light px-6 py-4 whitespace-nowrap border-r">
          {request.recipient}
        </td>
        <td className="text-base text-gray-900 sm:text-lg font-light px-6 py-4 whitespace-nowrap border-r">
          {request.approvalCount}/{approversCount}
        </td>
        <td className="text-base text-gray-900 sm:text-lg font-light px-6 py-4 whitespace-nowrap border-r">
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </td>
        <td className="text-base text-gray-900 sm:text-lg font-light px-6 py-4 whitespace-nowrap border-r">
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </td>
      </tr>
    )
  }
}

export default RequestRow
