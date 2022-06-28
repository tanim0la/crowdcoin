import React, { useState } from 'react'
import { Button, Form, Message, Input } from 'semantic-ui-react'
import Layout from '../../../../components/Layout'
import Web3 from 'web3'
import Campaign from '../../../../ethereum/campaign'
import factory from '../../../../ethereum/factory'
import { useRouter } from 'next/router'
import Link from 'next/link'

function RequestNew({ address }) {
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [recipient, setRecipient] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const Router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()

    let web3 = new Web3(window.ethereum)

    setLoading(true)
    setErrMessage('')
    try {
      const campaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        })

      Router.push(`/campaigns/${address}/requests`)
    } catch (err) {
      setErrMessage(err.message)
    }
    setLoading(false)
    setValue('')
    setDescription('')
    setRecipient('')
  }

  return (
    <Layout>
      <div className="pb-5">
        <Link href={`/campaigns/${address}/requests`}>
          <a className="text-blue-500">Back</a>
        </Link>
      </div>

      <h1 className="text-lg md:text-3xl sm:text-2xl font-semibold pb-2">
        Create a Request
      </h1>

      <Form onSubmit={onSubmit} error={errMessage ? true : false}>
        <Form.Field>
          <label>Description</label>
          <Input
            icon="address card"
            iconPosition="right"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value (ETH)</label>
          <Input
            label="ETH"
            labelPosition="right"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
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

export default RequestNew

export const getStaticProps = (context) => {
  const address = context.params.show

  return {
    props: { address },
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
