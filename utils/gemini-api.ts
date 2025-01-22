const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
  error?: {
    code: number
    message: string
    status: string
  }
}

export async function generateTherapistResponse(messages: Array<{ id: string; role: string; content: string }>) {
  try {
    const latestMessage = messages[messages.length - 1].content
    const conversationHistory = messages.slice(0, -1)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')
    
    const prompt = `You are an empathetic and professional AI therapist. Your role is to help clients explore their thoughts, feelings, and experiences in a supportive way. Use therapeutic techniques like active listening, reflection, and open-ended questions. Never give medical advice or diagnoses. Limit your response to asking only two questions to explore the client's situation further.

Previous conversation:
${conversationHistory}

Client's message:
${latestMessage}

Provide a therapeutic response that helps the client explore their thoughts and feelings deeper, asking no more than two questions:`

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini')
    }

    const data: GeminiResponse = await response.json()
    
    if (data.error) {
      throw new Error(data.error.message)
    }

    return data.candidates?.[0]?.content.parts[0].text || 'I apologize, but I was unable to generate a response. Please try again.'
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}

