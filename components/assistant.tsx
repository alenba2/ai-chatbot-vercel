"use client"

import { Message, useAssistant } from 'ai/react';
import { Chat } from '@/components/chat'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { ChatPanel } from '@/components/chat-panel'
import { Button } from '@/components/ui/button'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { IconShare } from '@/components/ui/icons'

export function Assistant(){
  const { status, messages, input, threadId, submitMessage, handleInputChange } =
  useAssistant({ api: '/api/assistant' });

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()


  return (
    <div
    className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
    ref={scrollRef}
  >

    <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {/* Chat Bubble here */}
          
          {/* <div className="space-y-4"> */}

        {messages.map((m: Message) => (
        <div key={m.id}>

          
          {/* <strong>{`${m.role}: `}</strong> */}

          {m.role === 'user' && (
            
           <div className="flex w-max max-w-[100%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              {m.content}
            
            </div>

            
            
          )}
          

          {m.role === 'assistant' && (
            
              <div className="flex w-max max-w-[100%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground">
              {m.content}
              
            </div>
            
           
          )}
          
          {/* {m.role === 'data' && (
            <>
              {(m.data as any).description}
              <br />
              <pre className={'bg-gray-200'}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )} */}
        </div>
      ))}

{/* </div> */}
              

        {/* {messages.map((m: Message) => (
        <div key={m.id}>
          <strong>{`${m.role}: `}</strong>
          {m.role !== 'data' && m.content}
          {m.role === 'data' && (
            <>
              {(m.data as any).description}
              <br />
              <pre className={'bg-gray-200'}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
        </div>
      ))} */}

        </div>
      </div>

      <ChatPanel
        id={threadId}
        input={input}
        setInput={handleInputChange}
        messages={messages}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        submitMessage={submitMessage}
      />

      {/* <Chat id={threadId} session={session} missingKeys={missingKeys} /> */}

      {/* {messages.map((m: Message) => (
        <div key={m.id}>
          <strong>{`${m.role}: `}</strong>
          {m.role !== 'data' && m.content}
          {m.role === 'data' && (
            <>
              {(m.data as any).description}
              <br />
              <pre className={'bg-gray-200'}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
        </div>
      ))}

      {status === 'in_progress' && <div />}

      <form onSubmit={submitMessage}>
        <input
          disabled={status !== 'awaiting_message'}
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form> */}
    </div>
  );
}