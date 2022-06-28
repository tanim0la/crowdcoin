import React, { useState } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Web3 from 'web3'
import Campaign from '../ethereum/campaign'
import { useRouter } from 'next/router'

function ContributeForm(props) {
  const [value, setValue] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const Router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    let web3 = new Web3(window.ethereum)

    const campaign = Campaign(props.address)

    setLoading(true)
    setErrMessage('')
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(value, 'ether'),
        from: accounts[0],
      })

      Router.replace(`/campaigns/${props.address}`)
    } catch (err) {
      setErrMessage(err.message)
    }
    setLoading(false)
    setValue('')
  }
  return (
    <Form
      onSubmit={onSubmit}
      error={errMessage ? true : false}
      className="px-5"
    >
      <Form.Field>
        <span className="text-lg md:text-2xl sm:text-xl font-semibold">
          Amount to Contribute
        </span>
        <Input
          label="ETH"
          labelPosition="right"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Message error header="Oops!" content={errMessage} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  )
}

export default ContributeForm
