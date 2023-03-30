import { useState, useRef } from 'react'
import Header from '@/components/Header'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Chat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(
    undefined
  )

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
  }

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '4.5rem'
    }
  }

  const handleBlur = () => {
    // reset the height to one line
    if (textareaRef.current) {
      textareaRef.current.style.height = '1.5rem'
      setTextareaHeight(undefined)
    }
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

        {/* INPUT SECTION */}
        <section className='w-full h-32 bg-gradient-to-t from-primaryBackground to-transparent fixed bottom-0 left-0 flex justify-center items-center p-5'>
          {/* TIP: see tailwind.config.js for shadow-custom values */}
          <div className='container flex bg-slate-800 max-w-2xl py-3 px-4 rounded-md border border-slate-700 shadow-custom'>
            <div className='flex-1 flex flex-col'>
              <textarea
                className='w-full resize-none overflow-hidden h-6 flex items-center justify-center bg-slate-800 text-md font-medium mr-3 scrollbar-bg-slate-800 placeholder-slate-500 focus:outline-none transition-height duration-300 outline-none'
                placeholder='Send a message...'
                ref={textareaRef}
                value={question}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  overflowY: 'scroll',
                  maxHeight: '15rem',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  ...(textareaHeight === undefined && { scrollbarHide: true }),
                }}
              />
              <div className='flex-1'></div>{' '}
              {/* empty space to push button to the bottom */}
            </div>
            <div className='flex justify-center items-end ml-1'>
              <button
                onClick={handleAsk}
                className={`border-none rounded-md py-1 px-2 w-max h-max focus:outline-none ${
                  question.length === 0
                    ? 'text-slate-600'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
                disabled={question.length === 0}
              >
                <IoPaperPlaneOutline />
              </button>
            </div>
          </div>
        </section>

        <p>{answer}</p>
      </main>
    </>
  )
}
