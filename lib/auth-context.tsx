"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { type Usuario, obterUsuarioPorCredenciais, adicionarUsuario } from "./mock-data"

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, senha: string) => Promise<Usuario>
  cadastrar: (dados: any) => Promise<Usuario>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Verificar se há um usuário no localStorage ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario")
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("usuario")
      }
    }
  }, []) // Certifique-se de que este useEffect só executa uma vez

  const login = async (email: string, senha: string): Promise<Usuario> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      const user = obterUsuarioPorCredenciais(email, senha)

      if (!user) {
        throw new Error("Credenciais inválidas")
      }

      // Salvar no localStorage
      localStorage.setItem("usuario", JSON.stringify(user))
      setUsuario(user)
      return user
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const cadastrar = async (dados: any): Promise<Usuario> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Criar novo usuário
      const novoUsuario = adicionarUsuario({
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        tipo: dados.tipo,
        documento: dados.documento,
        endereco: dados.endereco,
        telefone: dados.telefone,
        avatar: dados.nome.substring(0, 2).toUpperCase(),
      })

      // Salvar no localStorage
      localStorage.setItem("usuario", JSON.stringify(novoUsuario))
      setUsuario(novoUsuario)
      return novoUsuario
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("usuario")
    setUsuario(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ usuario, login, cadastrar, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
