import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertError({header, message}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{header}</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function AlertSuccess({header, message}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>{header}</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}

