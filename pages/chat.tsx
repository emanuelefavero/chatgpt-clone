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
    // set the textarea height to fit the content
    if (textareaRef.current) {
      // textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      setTextareaHeight(textareaRef.current.scrollHeight)
    }
  }

  const handleFocus = () => {
    // reset the height to fit the content
    // if (textareaRef.current && textareaHeight !== undefined) {
    //   textareaRef.current.style.height = `${textareaHeight}px`
    // }

    if (textareaRef.current) {
      textareaRef.current.style.height = '3.9rem'
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

        {/* TIP: see tailwind.config.js for shadow-custom values */}
        <div className='container flex bg-slate-800 max-w-2xl py-3 px-4 rounded-md border border-slate-700 shadow-custom'>
          <div className='flex-1 flex flex-col'>
            <textarea
              className='w-full resize-none overflow-hidden h-6 flex items-center justify-center bg-slate-800 text-md font-medium mr-3 placeholder-slate-500 focus:outline-none'
              placeholder='Send a message...'
              ref={textareaRef}
              value={question}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ overflowY: 'scroll', maxHeight: '15rem' }}
            />
            <div className='flex-1'></div>{' '}
            {/* empty space to push button to the bottom */}
          </div>
          <div className='flex justify-center items-end ml-1'>
            <button
              onClick={handleAsk}
              className='border-none rounded-md py-1 px-2 w-max h-max focus:outline-none text-slate-400 hover:bg-slate-900'
            >
              <IoPaperPlaneOutline />
            </button>
          </div>
        </div>

        <p>{answer}</p>
      </main>
    </>
  )
}
