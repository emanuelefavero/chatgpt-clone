import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { authenticate } from '../utils/auth'

export default function Login() {
  const router = useRouter()
  const [secretWord, setSecretWord] = useState('')

  const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Call the authenticate function with the secret word as the argument
      authenticate(secretWord)
      // Redirect to the chat page
      router.push('/chat')
    } catch (error: any) {
      // If the secret word is incorrect, display an error message
      // TODO: Use react-toastify to display the error message
      alert(error.message)
    }
  }

  const handleSecretWordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecretWord(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main className='flex flex-col justify-center items-center w-full h-screen'>
        <Image
          className='mb-4'
          src='/logo.png'
          alt='logo'
          width={44}
          height={44}
        />
        <p className='text-base font-medium mb-2'>Welcome to ChatGPT Clone</p>
        <p className='text-base font-medium mb-4'>
          Say the magic word to continue
        </p>

        <form
          onSubmit={handleLoginFormSubmit}
          className='flex flex-wrap justify-center items-center'
        >
          <input
            className='w-full sm:w-1/2 md:w-auto bg-indigo-900 bg-opacity-20 placeholder-slate-500 border-indigo-400 text-xl px-3 py-1 mb-3 sm:mb-0 sm:mr-1 rounded-lg md:mb-0'
            placeholder='Magic Word'
            type='password'
            value={secretWord}
            onChange={handleSecretWordChange}
            required
          />
          <button
            className='bg-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 border-indigo-500 text-xl px-3 py-1 sm:ml-1 rounded-lg w-full sm:w-auto'
            type='submit'
          >
            Login
          </button>
        </form>
      </main>
    </>
  )
}
