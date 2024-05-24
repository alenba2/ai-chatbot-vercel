// import { ChatHistory } from '@/components/chat-history'
import { Button } from "@/components/ui/button"


export function ThreadList() {

  return (
    <div className="pl-4 pt-2">
      <div>
        <div
          key={'hello'}
          className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${0 > 1 && 'hidden md:block'
            }`}>
          <div className="text-sm font-semibold">
            Thread #1
          </div>
          <div className="text-sm text-zinc-600">
            hello world
          </div>
        </div>
      </div>

    </div>

  )
}
