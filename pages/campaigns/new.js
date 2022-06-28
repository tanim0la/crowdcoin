import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import Web3 from 'web3'
import { useRouter } from 'next/router'

function CampaignNew() {
  const [minContribution, setMinContribution] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const Router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()

    let web3 = new Web3(window.ethereum)

    setErrMessage('')
    setLoading(true)
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods
        .createCampaign(web3.utils.toWei(minContribution, 'ether'))
        .send({ from: accounts[0] })

      Router.push('/')
    } catch (err) {
      setErrMessage(err.message)
    }
    setLoading(false)
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">New Campaign!!</h1>
      <Form
        onSubmit={onSubmit}
        error={errMessage ? true : false}
        className="p-2"
      >
        <Form.Field>
          <label className="text-gray-500">Minimum Contribution</label>
          <Input
            label="ETH"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  )
}

export default CampaignNew
