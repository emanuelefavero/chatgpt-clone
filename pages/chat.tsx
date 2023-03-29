import Header from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Chat() {
  return (
    <>
      <header className={inter.className}>
        <Header />
      </header>

      <main className={inter.className}>
        <h1>Chat Page</h1>
        <p>You are logged in.</p>
      </main>
    </>
  )
}
