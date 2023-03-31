export default function Footer() {
  return (
    <div className='max-w-2xl'>
      <p className='text-xs text-slate-500 select-none'>
        <a href='https://github.com/emanuelefavero'>
          <span className='text-sm  text-slate-400 underline mr-1 hover:text-slate-300'>
            Emanuele Favero
          </span>
        </a>{' '}
        {`© ${new Date().getFullYear()} `}
        <span className='hidden sm:inline'>
          <span className='mx-1'>&bull;</span> chatGPT clone using the OpenAI
          API
        </span>
      </p>
    </div>
  )
}
