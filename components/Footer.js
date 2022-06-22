import React from 'react'

function Footer() {
  return (
    <div className=" flex flex-col justify-center h-52 items-center ">
      <h1 className="text-gray-800 font-semibold sm:text-2xl">
        © 2022 All rights reserved | Built by{' '}
        <a
          href="https://github.com/tanim0la?tab=repositories"
          className="text-blue-600 hover:text-red-600 cursor-pointer"
          target="_blank"
        >
          tanim0la
        </a>
      </h1>
    </div>
  )
}

export default Footer
