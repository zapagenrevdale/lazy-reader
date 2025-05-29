"use client"
import { useUserStore } from "@/store/user"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { getUserUid } = useUserStore()

  useEffect(() => {
    redirect(`/${getUserUid()}`)

  }, [getUserUid])

  return <div className="flex min-h-screen items-center justify-center">
    <Loader2 className="animate-spin text-primary/80 size-32" />
  </div>

}
