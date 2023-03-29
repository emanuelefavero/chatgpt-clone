import { useRouter } from 'next/router'

export default function Chat() {
  const router = useRouter()

  const handleLogoutButtonClick = () => {
    // Remove the secret word from localStorage
    localStorage.removeItem('secretWord')
    // Redirect to the login page
    router.push('/login')
  }

  return (
    <div>
      <h1>Chat Page</h1>
      <p>You are logged in.</p>
      <button onClick={handleLogoutButtonClick}>Logout</button>
    </div>
  )
}
