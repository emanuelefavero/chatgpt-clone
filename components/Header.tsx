import { useRouter } from 'next/router'
import { FiLogOut, FiPlus } from 'react-icons/fi'

export default function Header() {
  const router = useRouter()

  const handleLogoutButtonClick = () => {
    // Remove the secret word from localStorage
    localStorage.removeItem('secretWord')
    // Redirect to the login page

    router.push('/login') // ! if this raises an error, try router.reload()
    // router.reload()
  }

  return (
    <>
      {/* TODO: Add react-icons to Log out and New chat */}
      <button
        onClick={handleLogoutButtonClick}
        className='border-0 flex items-center px-0.5 rounded-md focus:outline-none focus:bg-slate-800 focus:bg-opacity-60'
      >
        <FiLogOut className='mr-2' />
        Log out
      </button>
      <button
        onClick={() => router.reload()}
        className='border-0 flex items-center px-0.5 rounded-md focus:outline-none focus:bg-slate-800 focus:bg-opacity-60'
      >
        <FiPlus className='mr-2' />
        New chat
      </button>
    </>
  )
}
