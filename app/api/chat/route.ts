import { NextRequest, NextResponse } from 'next/server'
import { matchKeywordToResponse } from '@/lib/knowledge-base'
import { searchDocs } from '@/lib/search'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      )
    }

    const userMessage = messages[messages.length - 1]?.content

    if (!userMessage) {
      return NextResponse.json(
        { error: 'No user message found' },
        { status: 400 }
      )
    }

    const docs = searchDocs(userMessage)

    if (docs.length === 0) {
      return NextResponse.json({
        message:
          "I don't have verified information about that. Please contact Shashi Madan Public School at +91-9258159506 or visit https://smpschandausi.com."
      })
    }

    const context = docs
      .map(doc => doc.text || doc.markdown)
      .join('\n\n')

    const SYSTEM_PROMPT = `
You are the official AI assistant of Shashi Madan Public School.

You MUST answer ONLY from the supplied context.

Never use your own knowledge.
Never guess.
Never invent facts.

If the answer is not found in the supplied context, reply exactly:

"I don't have verified information about that. Please contact Shashi Madan Public School at +91-9258159506 or visit https://smpschandausi.com."

Context:
${context}
`

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': process.env.GEMINI_API_KEY,
            },
            body: JSON.stringify({
              system_instruction: {
                parts: {
                  text: SYSTEM_PROMPT,
                },
              },
              contents: [
                {
                  parts: [
                    {
                      text: userMessage,
                    },
                  ],
                },
              ],
            }),
          }
        )

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`)
        }

        const data = await response.json()

        const botMessage =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "I'm sorry, I don't have verified information about that. Please contact Shashi Madan Public School directly on +91-9258159506 or visit https://smpschandausi.com/."

        return NextResponse.json({
          message: botMessage,
        })
      } catch (error) {
        console.error('Gemini API Error:', error)
      }
    }

    const response = matchKeywordToResponse(userMessage)

    return NextResponse.json({
      message: response,
    })
  } catch (error) {
    console.error('Chat API Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process chat request',
      },
      {
        status: 500,
      }
    )
  }
}
