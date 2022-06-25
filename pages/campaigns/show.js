import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'
import Web3 from 'web3'
import Campaign from '../../ethereum/campaign'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class Show extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)

    const summary = await campaign.methods.getSummary().call()

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address,
    }
  }

  render() {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/adaa638d09ba451589fc8a00235e3489',
    )
    let web3 = new Web3(provider)
    return (
      <Layout>
        <div className="flex flex-row justify-between py-4">
          <h1 className="text-lg md:text-3xl sm:text-2xl font-semibold">
            Campaign Details
          </h1>
          <div className="-mt-4">
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="sm:grid grid-cols-2 gap-4 flex flex-wrap-reverse">
          <div>
            <div className="bg-gray-50 rounded-r-lg border-l-4 border-blue-500 mb-5 max-h-full w-full ">
              <span className="flex flex-col pl-1 pt-2 pr-0">
                <span className="text-lg font-semibold md:text-2xl break-all">
                  {this.props.manager}
                </span>
                <span className="text-gray-500">Address of Manager</span>
                <span className="text-gray-800 py-2 text-lg">
                  The manager created this campaign and can create request to
                  withdraw money.
                </span>
              </span>
            </div>

            <div className="bg-gray-50 rounded-r-lg border-l-4 border-blue-500 mb-5 max-h-full w-full ">
              <span className="flex flex-col pl-1 pt-2 pr-1">
                <span className="text-lg font-semibold md:text-2xl break-all ">
                  {web3.utils.fromWei(this.props.minimumContribution, 'ether')}
                </span>
                <span className="text-gray-500">
                  Minimum Contribution (ETH)
                </span>
                <span className="text-gray-800 py-2 text-lg">
                  You must contribute at least this much wei to become an
                  approver.
                </span>
              </span>
            </div>

            <div className="bg-gray-50 rounded-r-lg border-l-4 border-blue-500 mb-5 max-h-full w-full ">
              <span className="flex flex-col pl-1 pt-2 pr-1">
                <span className="text-lg font-semibold md:text-2xl break-all ">
                  {this.props.requestsCount}
                </span>
                <span className="text-gray-500">Number of Requests</span>
                <span className="text-gray-800 py-2 text-lg">
                  A request tries to withdraw monet from the contract. Requests
                  must be approved by approvers
                </span>
              </span>
            </div>

            <div className="bg-gray-50 rounded-r-lg border-l-4 border-blue-500 mb-5 max-h-full w-full ">
              <span className="flex flex-col pl-1 pt-2 pr-1">
                <span className="text-lg font-semibold md:text-2xl break-all ">
                  {this.props.approversCount}
                </span>
                <span className="text-gray-500">Number of Contributors</span>
                <span className="text-gray-800 py-2 text-lg">
                  Number of people who have already contributed to this
                  campaign.
                </span>
              </span>
            </div>

            <div className="bg-gray-50 rounded-r-lg border-l-4 border-blue-500 mb-5 max-h-full w-full ">
              <span className="flex flex-col pl-1 pt-2 pr-1">
                <span className="text-lg font-semibold md:text-2xl break-all ">
                  {web3.utils.fromWei(this.props.balance, 'ether')}
                </span>
                <span className="text-gray-500">Amount Contributed (ETH)</span>
                <span className="text-gray-800 py-2 text-lg">
                  This is the amount this campaign has left to spend.
                </span>
              </span>
            </div>
          </div>
          <div>
            <ContributeForm address={this.props.address} />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Show
