import Link from "next/link"
import { Calendar } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">EventHub</span>
      </Link>
    </div>
  )
}
