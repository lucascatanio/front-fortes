"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthService } from "@/lib/auth-service"
import { useState } from "react"

// Contexto de autenticação
const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
})

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext)

// Rotas públicas que não requerem autenticação
const publicRoutes = ["/", "/login", "/cadastro", "/esqueci-senha"]

// Componente provedor de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [usuario, setUsuario] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = AuthService.getUsuarioAtual()
      console.log("AuthProvider - Usuário atual:", currentUser)
      setUsuario(currentUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Redirecionar com base na autenticação e tipo de usuário
  useEffect(() => {
    if (isLoading) return

    // Ignorar redirecionamento em rotas públicas
    if (publicRoutes.includes(pathname)) {
      console.log("Rota pública, não redirecionando:", pathname)
      return
    }

    // Se não estiver autenticado, redirecionar para login
    if (!usuario) {
      console.log("Usuário não autenticado, redirecionando para login")
      router.push("/login")
      return
    }

    console.log("Usuário autenticado:", usuario, "Pathname:", pathname)

    // Verificar se o usuário está acessando a área correta
    const isEmpresaRoute = pathname.startsWith("/empresa")
    const isInstituicaoRoute = pathname.startsWith("/projetos")

    if (usuario.tipo === "empresa" && isInstituicaoRoute) {
      console.log("Empresa tentando acessar área de instituição, redirecionando para dashboard de empresa")
      router.push("/empresa/dashboard")
    } else if (usuario.tipo === "instituicao" && isEmpresaRoute) {
      console.log("Instituição tentando acessar área de empresa, redirecionando para projetos")
      router.push("/projetos")
    }
  }, [usuario, pathname, router, isLoading])

  return <AuthContext.Provider value={{ isAuthenticated: !!usuario }}>{children}</AuthContext.Provider>
}
