import React from 'react'
import { PlusIcon } from '@heroicons/react/outline'
import { Link } from '../routes'

const Header = () => {
  return (
    <>
      <div className="flex justify-between py-7 px-4">
        <div>
          <Link route="/">
            <span className="text-2xl font-bold cursor-pointer md:text-3xl">
              Crowd<span className="text-blue-500">Coin</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-row gap-3">
          <Link route="/">
            <span className="text-xl font-bold cursor-pointer hover:text-blue-600">
              Campaigns
            </span>
          </Link>

          <Link route="/campaigns/new">
            <PlusIcon className="h-7 w-6 cursor-pointer hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
