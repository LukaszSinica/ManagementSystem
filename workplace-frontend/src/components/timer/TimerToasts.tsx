import { toast } from "@/hooks/use-toast";

export function TimerSuccessfulToast(time: string) {
  return toast({
    title: "Time was added successfully",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{time}</code>
      </pre>
    ),
  })
}

export function TimerUnsuccessfulToast(time: string) {
    return toast({
        title: "Time was not added",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{time}</code>
          </pre>
        ),
  })
}