
import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: 'user',
      content: input.message,
    },
    { signal: req.signal },
  );

  console.log(createdMessage);


  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {

        console.log("hi");
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(
        threadId,
        {
          assistant_id:
            process.env.ASSISTANT_ID ??
            (() => {
              throw new Error('ASSISTANT_ID is not set');
            })(),
        },
        { signal: req.signal },
      );
      console.log("hi2"); 
      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);
      console.log(runResult); 


      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs' 
      ) {
        
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              console.log(toolCall.function.name);

              switch (toolCall.function.name) {
                //If tools are used. modify here
                

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
              }
            },
          );
        
        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
            { signal: req.signal },
          ),
        );
      }
    },
  );
}
