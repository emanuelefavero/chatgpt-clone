# chatGPT Clone

This is a clone of the [chatGPT](https://chat.openai.com/chat) website that instead uses the [GPT API](https://platform.openai.com/docs/guides/chat)

It is really useful if the free chatGPT is down

> Note: This is still a work in progress

## How to use

- Clone the repo and `cd` into it
- Install the dependencies using `npm i`

- Create a `.env` file and add your OpenAI API key as well as a secret key for authentication

> Note: You can choose any secret key string you want

```bash
NEXT_PUBLIC_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SECRET='Your secret key'
```

- Run the development server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
