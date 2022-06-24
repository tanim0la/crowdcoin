import React, { Component } from 'react'
import Layout from '../../../components/Layout'
import { Button, Table, TabPane } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call()
        }),
    )

    return { address, requests, requestCount, approversCount }
  }

  renderRows = () => {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          approversCount={this.props.approversCount}
          address={this.props.address}
        />
      )
    })
  }
  render() {
    return (
      <Layout>
        <div className="flex flex-row justify-between py-4">
          <h1 className="text-lg md:text-3xl sm:text-2xl font-semibold">
            Requests
          </h1>

          <div className="-mt-4">
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
              <a>
                <Button primary floated="right" style={{ marginBottom: 10 }}>
                  Add Request
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="table-fixed  border text-center">
            <thead className="border-b bg-gray-800 text-white ">
              <tr>
                <th className="py-3 px-3 md:px-6">ID</th>
                <th className="px-24 md:px-40">Description</th>
                <th className="px-5 md:px-10">Amount</th>
                <th className="px-24 md:px-32">Recipient</th>
                <th className="px-5 md:px-10">Approval Count</th>
                <th className="px-6 md:px-12">Approve</th>
                <th className="px-6 md:px-12">Finalize</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>

        <div className="text-lg p-3">
          {this.props.requestCount == 1
            ? `Found ${this.props.requestCount} request.`
            : `Found ${this.props.requestCount} requests.`}
        </div>
      </Layout>
    )
  }
}

export default RequestIndex
