import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastProvider } from '@/contexts/ToastContext'

import '@/styles/globals.css'
import { ToastMessage } from '@/components/ToastMessage'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Head>
        <title>Teste Front-End - BNP</title>
      </Head>
      <Component {...pageProps} />
      <div className="toast-container">
        <ToastMessage />
      </div>
    </ToastProvider>
  )
}
