"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type Projeto,
  projetos as mockProjetos,
  adicionarProjeto as addProjeto,
  atualizarProjeto as updateProjeto,
  removerProjeto as removeProjeto,
  obterProjetosPorInstituicao,
} from "./mock-data"
import { useAuth } from "./auth-context"

interface ProjetosContextType {
  projetos: Projeto[]
  adicionarProjeto: (projeto: Omit<Projeto, "id">) => Promise<Projeto>
  atualizarProjeto: (projeto: Projeto) => Promise<Projeto>
  removerProjeto: (id: string) => Promise<void>
  carregarProjetos: () => Promise<Projeto[]>
  carregarProjetosPorInstituicao: (instituicaoId: string) => Promise<Projeto[]>
  isLoading: boolean
  error: string | null
}

const ProjetosContext = createContext<ProjetosContextType | undefined>(undefined)

export function ProjetosProvider({ children }: { children: ReactNode }) {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { usuario } = useAuth()

  // Carregar projetos iniciais
  useEffect(() => {
    const fetchProjetos = async () => {
      if (usuario) {
        if (usuario.tipo === "instituicao") {
          await carregarProjetosPorInstituicao(usuario.id)
        } else {
          await carregarProjetos()
        }
      }
    }

    fetchProjetos()
    // Remover dependências que podem causar loops
  }, [usuario]) // Apenas depender do usuário, não das funções

  // Modificar as funções para evitar problemas
  const carregarProjetos = async (): Promise<Projeto[]> => {
    if (isLoading) return projetos // Evitar múltiplas chamadas simultâneas

    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      setProjetos(mockProjetos)
      return mockProjetos
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const carregarProjetosPorInstituicao = async (instituicaoId: string): Promise<Projeto[]> => {
    if (isLoading) return projetos // Evitar múltiplas chamadas simultâneas

    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      const projetosFiltrados = obterProjetosPorInstituicao(instituicaoId)
      setProjetos(projetosFiltrados)
      return projetosFiltrados
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const adicionarProjeto = async (projeto: Omit<Projeto, "id">): Promise<Projeto> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      const novoProjeto = addProjeto(projeto)
      setProjetos((prev) => [...prev, novoProjeto])
      return novoProjeto
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const atualizarProjeto = async (projeto: Projeto): Promise<Projeto> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      const projetoAtualizado = updateProjeto(projeto)
      setProjetos((prev) => prev.map((p) => (p.id === projeto.id ? projetoAtualizado : p)))
      return projetoAtualizado
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const removerProjeto = async (id: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simular um delay de rede
      await new Promise((resolve) => setTimeout(resolve, 800))

      removeProjeto(id)
      setProjetos((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError((err as Error).message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProjetosContext.Provider
      value={{
        projetos,
        adicionarProjeto,
        atualizarProjeto,
        removerProjeto,
        carregarProjetos,
        carregarProjetosPorInstituicao,
        isLoading,
        error,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  )
}

export function useProjetos() {
  const context = useContext(ProjetosContext)
  if (context === undefined) {
    throw new Error("useProjetos deve ser usado dentro de um ProjetosProvider")
  }
  return context
}
