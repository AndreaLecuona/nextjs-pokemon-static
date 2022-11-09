import Head from 'next/head'
import React, { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'

export const Layout: FC<PropsWithChildren<{title:string}>> = ({ children, title }) => {
  
  const origin = (typeof window === 'undefined') ? "" : window.location.origin;
  
  return (
    <>
        <Head>
            <title>{ title || "Pokemon App"}</title>
            <meta name="author" content="Andre"/>
            <meta name="description" content={`Información sobre el pokemon ${ title }`}/>
            <meta name="keywords" content={`${ title }, pokemon, pokedex`}/>
            {/* open graph metatags */}
            <meta property="og:title" content={`Información sobre ${ title }`} />
            <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar />

        <main style={{
          padding: "0 20px"
        }}>
            { children }
        </main>
    </>
  )
}
