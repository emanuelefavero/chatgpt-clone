import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isAuthenticated } from '../utils/auth'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated() && router.pathname !== 'login') {
      router.push('/login')
    } else if (isAuthenticated()) {
      router.push('/chat')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ! router is not included in the dependency array because we only want to run this effect once

  return (
    <>
      <Head>
        <title>ChatGPT Clone</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
