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

      <main className='login'>
        <Image src='/logo.png' alt='logo' width={48} height={48} />
        <p>Welcome to ChatGPT Clone</p>
        <p>Say the magic word to continue</p>
        <form onSubmit={handleLoginFormSubmit}>
          <input
            placeholder='Magic Word'
            type='password'
            value={secretWord}
            onChange={handleSecretWordChange}
            required
          />
          <button type='submit'>Login</button>
        </form>
      </main>
    </>
  )
}
