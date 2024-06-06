import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { useState, FormEvent } from 'react';
// import { Message, useAssistant } from 'ai/react';
import { Assistant } from '@/components/assistant'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  // const id = nanoid()
  // const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys()

  //Calls AI assistant
  // const { status, messages, input, submitMessage, handleInputChange } =
  // useAssistant({ api: '/api/assistant' })


  return (
    // <AI initialAIState={{ chatId: id, messages: [] }}>
    //   <Chat id={id} session={session} missingKeys={missingKeys} />
    // </AI>

    // <Assistant initialAIState={{ chatId: id, messages: [] }}>

    // </Assistant>
    
    <Assistant/>
  
    
  )
}
