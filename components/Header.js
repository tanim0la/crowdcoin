import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import Link from 'next/link'

const Header = () => {
  let accounts
  const [word, setWord] = useState('CONNECT WALLET')

  useEffect(() => {
    const onConnect = async () => {
      accounts = await ethereum.request({
        method: 'eth_accounts',
      })

      if (accounts[0]) {
        setWord(accounts[0])
      } else {
        setWord('CONNECT WALLET')
      }
    }

    onConnect()
  }, [word])

  const onConnect = async () => {
    //console.log('yeah')

    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      // We are in the browser and metamask is running.
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      setWord(accounts[0])
    } else {
      setWord('CONNECT WALLET')
    }
  }
  return (
    <>
      <div className="flex justify-between  px-4">
        <div className="py-7">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer md:text-3xl">
              Crowd<span className="text-blue-500">Coin</span>
            </span>
          </Link>
        </div>

        <div className="py-5">
          <button
            onClick={onConnect}
            className="p-3  bg-blue-500 hover:bg-blue-600 rounded-full text-white"
          >
            {word.length > 40
              ? word.slice(0, 5) + '...' + word.slice(37, 42)
              : word}
          </button>
        </div>
      </div>
    </>
  )
}

export default Header
