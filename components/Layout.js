import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div className="px-2 sm:px-4 md:px-8">
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
