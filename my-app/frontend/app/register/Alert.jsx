import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function RegisterError({message}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Invalid Registration Details</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
