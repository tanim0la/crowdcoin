import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class CampaignNew extends Component {
  state = {
    minContribution: '',
    errMessage: '',
    loading: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()

    this.setState({ loading: true, errMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(web3.utils.toWei(this.state.minContribution, 'ether'))
        .send({ from: accounts[0] })

      Router.pushRoute('/')
    } catch (err) {
      this.setState({ errMessage: err.message })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <h1 className="text-2xl font-semibold">New Campaign!!</h1>
        <Form
          onSubmit={this.onSubmit}
          error={this.state.errMessage ? true : false}
          className="p-2"
        >
          <Form.Field>
            <label className="text-gray-500">Minimum Contribution</label>
            <Input
              label="ETH"
              labelPosition="right"
              value={this.state.minContribution}
              onChange={(e) =>
                this.setState({ minContribution: e.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew
