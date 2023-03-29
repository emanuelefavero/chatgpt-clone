export const authenticate = (secretWord: string): void => {
  console.log('process.env.NEXT_PUBLIC_SECRET', process.env.NEXT_PUBLIC_SECRET)
  // Check if the secret word is equal to the environment variable
  if (secretWord === process.env.NEXT_PUBLIC_SECRET) {
    // Store the secret word in localStorage
    localStorage.setItem('secretWord', secretWord)
  } else {
    // If the secret word is not correct, throw an error
    throw new Error('Incorrect secret word')
  }
}

export const isAuthenticated = (): boolean => {
  // Check if the secret word is stored in localStorage
  const secretWord = localStorage.getItem('secretWord')

  // Return true if the secret word is stored in localStorage
  return Boolean(secretWord)
}
