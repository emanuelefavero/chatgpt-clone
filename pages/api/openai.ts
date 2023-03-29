import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question } = req.body

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    })

    const answer = response?.data?.choices?.[0]?.message?.content ?? 'No answer'

    res.status(200).json({ answer })
  } catch (error) {
    console.error('Error:', error) // !
    res.status(500).json({ error: 'Server Error' })
  }
}
