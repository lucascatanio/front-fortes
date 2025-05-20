"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function RedirectPage() {
  const router = useRouter()
  const { usuario } = useAuth()

  useEffect(() => {
    if (usuario) {
      if (usuario.tipo === "empresa") {
        router.push("/empresa/dashboard")
      } else {
        router.push("/projetos")
      }
    } else {
      router.push("/login")
    }
  }, [usuario, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg">Redirecionando...</p>
    </div>
  )
}
