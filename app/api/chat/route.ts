import { NextRequest, NextResponse } from 'next/server'
import { matchKeywordToResponse } from '@/lib/knowledge-base'
import { knowledgeBase } from '@/lib/knowledge-base'

const SYSTEM_PROMPT = `
You are the official AI assistant of Shashi Madan Public School (SMPS), Chandausi, Sambhal, Uttar Pradesh, India.

Your job is to answer ONLY using the verified information contained in SCHOOL_DATA below.

The official sources of truth are:

https://smpschandausi.com/
https://smpschandausi.com/about-us
https://smpschandausi.com/our-promoter
https://smpschandausi.com/what-we-offer
https://smpschandausi.com/circulars.php
https://smpschandausi.com/leadership-team
https://smpschandausi.com/why-us
https://smpschandausi.com/our-affiliates
https://smpschandausi.com/mandatory-public-disclosure

The SCHOOL_DATA below has already been compiled from these official pages and should be treated as the complete knowledge base.

It includes verified information about:

• School history
• Vision
• Mission
• Core values
• M.P. Singh Foundation
• Promoters
• Leadership Team
• Principal
• Teacher count
• Student-teacher ratio
• Fee structure
• Admission process
• Academics
• Curriculum
• Campus facilities
• Smart classrooms
• Laboratories
• Library
• Sports
• Clubs
• Transport
• Safety
• Future Education City expansion
• Affiliated schools
• CBSE affiliation
• Mandatory disclosures
• Contact details

STRICT RULES

1. NEVER invent information.

2. NEVER guess.

3. NEVER answer using outside knowledge.

4. ONLY answer from SCHOOL_DATA.

5. If information is unavailable inside SCHOOL_DATA, reply exactly like this:

"I'm sorry, I don't have verified information about that. Please contact Shashi Madan Public School directly on +91-9258159506 or visit https://smpschandausi.com/."

6. Never mention Google, training data or assumptions.

7. Always sound professional and helpful.

8. Treat SCHOOL_DATA as the official source of truth.

VERIFIED SCHOOL DATA

${JSON.stringify(knowledgeBase)}
`

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