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
      <button onClick={handleLogoutButtonClick}>
        <FiLogOut />
        Log out
      </button>
      <button onClick={() => router.reload()}>
        <FiPlus />
        New chat
      </button>
    </>
  )
}
