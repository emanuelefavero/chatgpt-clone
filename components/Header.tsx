import { useRouter } from 'next/router'

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
      <button onClick={handleLogoutButtonClick}>Log out</button>
      <button onClick={() => router.reload()}>+ New chat</button>
    </>
  )
}
