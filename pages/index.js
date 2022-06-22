import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'
import { Link } from '../routes'

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return { campaigns }
  }

  render() {
    const renderCampaigns = () => {
      const items = this.props.campaigns.map((address, index) => {
        return (
          <div
            key={index}
            className="bg-gray-100 rounded-r-lg border-l-4 border-blue-600 mb-5 max-h-full w-full "
          >
            <span className="flex flex-col font-semibold pl-1 pt-2 pr-1">
              <span className="text-lg md:text-2xl break-all ">{address}</span>
              <Link route={`/campaigns/${address}`}>
                <span className="text-blue-500 cursor-pointer hover:text-red-500 py-1">
                  View Campaign
                </span>
              </Link>
            </span>
          </div>
        )
      })

      return items
    }

    return (
      <Layout>
        <div className="pt-5">
          <div className="flex flex-row justify-between pb-3">
            <span className="text-lg md:text-3xl sm:text-2xl font-semibold">
              List of Campaigns
            </span>

            <span className="-mt-4 ">
              <Link route="/campaigns/new">
                <a>
                  <Button content="Create Campaign" icon="add" primary />
                </a>
              </Link>
            </span>
          </div>

          <div className="sm:grid grid-cols-3 ">
            <div className="col-span-2">{renderCampaigns()}</div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default CampaignIndex
