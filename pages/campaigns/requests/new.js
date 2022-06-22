import React, { Component } from 'react'
import { Button, Form, Message, Input } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/campaign'
import { Router, Link } from '../../../routes'

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    errMessage: '',
    loading: false,
  }
  static async getInitialProps(props) {
    const { address } = props.query

    return { address }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { address } = this.props

    this.setState({ loading: true, errMessage: '' })
    try {
      const campaign = Campaign(address)
      const { description, value, recipient } = this.state
      const accounts = await web3.eth.getAccounts()

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        })

      Router.pushRoute(`/campaigns/${address}/requests`)
    } catch (err) {
      this.setState({ errMessage: err.message })
    }
    this.setState({ loading: false, value: '', description: '', recipient: '' })
  }

  render() {
    return (
      <Layout>
        <div className="pb-5">
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a className="text-blue-500">Back</a>
          </Link>
        </div>

        <h1 className="text-lg md:text-3xl sm:text-2xl font-semibold pb-2">
          Create a Request
        </h1>

        <Form
          onSubmit={this.onSubmit}
          error={this.state.errMessage ? true : false}
        >
          <Form.Field>
            <label>Description</label>
            <Input
              icon="address card"
              iconPosition="right"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value (ETH)</label>
            <Input
              label="ETH"
              labelPosition="right"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              placeholder="0x..."
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
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

export default RequestNew
