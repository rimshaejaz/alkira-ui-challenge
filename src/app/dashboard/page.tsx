import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  return (
    <div className="h-screen w-full max-w-xl flex items-center justify-center">
      <Alert variant="destructive" className="flex items-center space-x-2">
        <CheckCircle2Icon />
        <AlertTitle>Success! You have reached the private page.</AlertTitle>
      </Alert>
    </div>
  )
}
