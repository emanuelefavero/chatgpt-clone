import styles from '@/styles/chat.module.scss'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { IoPaperPlaneOutline } from 'react-icons/io5'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Chat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(
    undefined
  )

  async function handleAsk() {
    setLoading(true)
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const { answer } = await response.json()

    setAnswer(answer)
    setLoading(false)
    // setQuestion('')
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
      {/* HEADER */}

      <header
        className={`${inter.className} w-full sticky flex justify-center items-center bg-primaryBackground border-b border-slate-300 border-opacity-20`}
      >
        <Header />
      </header>

      {/* MAIN */}
      <main className={inter.className}>
        {/* TODO: Add the asked question section */}
        {/* TODO: (In the future when OpenAI adds this feature) Store the conversation memory to provide answers related with previous questions */}
        {/* BEWARE: As of early 2023 OpenAI doesn't provide the ability to store conversation memory, you need to use third party tools such as this one:  */}
        {/* @see https://github.com/transitive-bullshit/chatgpt-api */}

        {loading ? (
          <>
            {/* LOADER */}
            <Loader />
          </>
        ) : answer ? (
          <>
            {/* answer, show ANSWER SECTION */}
            <section className='w-full flex justify-center bg-slate-800 py-10 px-4'>
              <div className='max-w-2xl container flex flex-row justify-start items-start md:relative md:right-4'>
                <Image
                  className='select-none mr-5 hidden sm:inline-block'
                  src='/logo.png'
                  alt='logo'
                  width={30}
                  height={30}
                />
                <div className='text-slate-200 leading-7'>
                  {/* RENDER MARKDOWN WITH SYNTAX HIGHLIGHTING */}
                  <ReactMarkdown
                    className={styles.markdown}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={nightOwl as any}
                            language={match[1]}
                            PreTag='div'
                            // Custom styling
                            customStyle={{
                              padding: '0.4rem 1rem 0.2rem 1rem',
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {answer}
                  </ReactMarkdown>
                  {/* LOREM IPSUM TEXT FOR TESTING PURPOSES */}
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum labore delectus, odit voluptates rem dolores porro
                  vitae inventore in deserunt tenetur optio commodi
                  exercitationem quaerat laudantium ex. Magni nisi aliquam quod,
                  nam incidunt quas ratione omnis possimus et porro nobis
                  maiores exercitationem accusantium laborum quaerat vero, quae
                  provident numquam dolor facilis! Quod corrupti blanditiis
                  reprehenderit! Obcaecati dicta necessitatibus sequi excepturi
                  esse dolorem delectus, consequatur odio, soluta atque sit
                  eligendi omnis vel quidem deleniti ratione. Odit doloribus
                  animi repellat quae, ex atque libero vel accusantium
                  recusandae sunt natus dolore quam velit sint deserunt?
                  Dolorum, deserunt incidunt consectetur commodi laborum
                  voluptatibus ex? */}
                </div>
              </div>
            </section>
          </>
        ) : (
          // no answer, show WELCOME SCREEN
          <section className='w-full mt-20 p-5 flex justify-center items-center'>
            <h1 className='relative text-center text-3xl font-bold text-slate-200'>
              ChatGPT Clone
            </h1>
          </section>
        )}

        {/* INPUT SECTION */}
        <section className='w-full h-32 bg-gradient-to-t from-primaryBackground to-transparent fixed bottom-12 left-0 flex justify-center items-center p-5 xxs:bottom-8 sm:bottom-6'>
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
                  // ...(textareaHeight === undefined && { scrollbarHide: true }),
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
                    : 'text-slate-300 hover:bg-indigo-800'
                }`}
                disabled={question.length === 0}
              >
                <IoPaperPlaneOutline />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* WHITE SPACE BEFORE FOOTER */}
      <div className='w-full h-44 bg-primaryBackground'></div>

      {/* FOOTER */}
      <footer
        className={`${inter.className} w-full flex justify-center items-center fixed bottom-0 bg-primaryBackground pb-2`}
      >
        <Footer />
      </footer>
    </>
  )
}
