import { useState } from 'react'
import Header from '@/components/Header'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Chat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  async function handleAsk() {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const { answer } = await response.json()

    setAnswer(answer)
    setQuestion('')
  }

  return (
    <>
      <header
        className={`${inter.className} flex justify-between items-center border-b border-slate-400 border-opacity-20`}
      >
        <Header />
      </header>

      <main className={inter.className}>
        <h1>Chat Page</h1>
        <p>You are logged in.</p>

        <div>
          <input
            type='text'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {/* TODO: Add react-icons to Ask button */}
          <button onClick={handleAsk}>
            <IoPaperPlaneOutline />
          </button>
        </div>

        <p>{answer}</p>
      </main>
    </>
  )
}
