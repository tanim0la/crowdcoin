import React from 'react'
import Layout from '../../../../components/Layout'
import { Button } from 'semantic-ui-react'
import Link from 'next/link'
import Campaign from '../../../../ethereum/campaign'
import factory from '../../../../ethereum/factory'
import RequestRow from '../../../../components/RequestRow'

function RequestIndex({ address, requests, requestCount, approversCount }) {
  const Requests = JSON.parse(requests)
  const renderRows = () => {
    return Requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          approversCount={approversCount}
          address={address}
        />
      )
    })
  }
  return (
    <Layout>
      <div className="flex flex-row justify-between py-4">
        <h1 className="text-lg md:text-3xl sm:text-2xl font-semibold">
          Requests
        </h1>

        <div className="-mt-4">
          <Link
            href="/campaigns/[show]/requests/new"
            as={`/campaigns/${address}/requests/new`}
          >
            <a>
              <Button primary floated="right" style={{ marginBottom: 10 }}>
                Add Request
              </Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide w-full">
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
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      <div className="text-lg p-3">
        {requestCount == 1
          ? `Found ${requestCount} request.`
          : `Found ${requestCount} requests.`}
      </div>
    </Layout>
  )
}

export default RequestIndex

export const getStaticProps = async (context) => {
  const address = context.params.show
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

  return {
    props: {
      address: address,
      requests: JSON.stringify(requests),
      requestCount: requestCount,
      approversCount: approversCount,
    },
  }
}

export const getStaticPaths = async () => {
  const addresses = await factory.methods.getDeployedCampaigns().call()
  const campaigns = String(addresses).split(',')

  const paths = campaigns.map((address) => ({
    params: { show: address.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}
