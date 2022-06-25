import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Web3 from 'web3'
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class ContributeForm extends Component {
  state = {
    value: '',
    errMessage: '',
    loading: false,
  }

  onSubmit = async (e) => {
    e.preventDefault()
    let web3 = new Web3(window.ethereum)

    const campaign = Campaign(this.props.address)
    this.setState({ loading: true, errMessage: '' })
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(this.state.value, 'ether'),
        from: accounts[0],
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (err) {
      this.setState({ errMessage: err.message })
    }
    this.setState({ loading: false, value: '' })
  }
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        error={this.state.errMessage ? true : false}
        className="px-5"
      >
        <Form.Field>
          <span className="text-lg md:text-2xl sm:text-xl font-semibold">
            Amount to Contribute
          </span>
          <Input
            label="ETH"
            labelPosition="right"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errMessage} />
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default ContributeForm
