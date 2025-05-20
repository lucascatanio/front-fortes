"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Loader2 } from "lucide-react"
import { ProjetoCard } from "@/components/projeto-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProjetos } from "@/lib/projetos-context"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ProjetosPage() {
  const { projetos, carregarProjetos, carregarProjetosPorInstituicao, isLoading } = useProjetos()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProjetos, setFilteredProjetos] = useState(projetos)
  const router = useRouter()
  const { toast } = useToast()
  const { usuario } = useAuth()

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        if (usuario && usuario.tipo === "instituicao") {
          await carregarProjetosPorInstituicao(usuario.id)
        } else if (usuario) {
          await carregarProjetos()
        }
      } catch (error) {
        console.error("Erro ao carregar projetos:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os projetos. Tente novamente.",
          variant: "destructive",
        })
      }
    }

    if (usuario) {
      fetchProjetos()
    }
    // Remover dependências que podem causar loops
  }, [usuario]) // Apenas depender do usuário

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjetos(projetos)
    } else {
      const filtered = projetos.filter(
        (projeto) =>
          projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projeto.endereco.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProjetos(filtered)
    }
  }, [searchTerm, projetos])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Projetos</h1>
          <Button onClick={() => router.push("/projetos/criar")}>
            <Plus className="mr-2 h-4 w-4" /> Criar Projeto
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Pesquisar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="todos">
            <TabsList className="mb-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            </TabsList>
            <TabsContent value="todos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjetos.map((projeto) => (
                  <ProjetoCard key={projeto.id} projeto={projeto} />
                ))}
                {filteredProjetos.length === 0 && (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    Nenhum projeto encontrado. Crie um novo projeto!
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="pendentes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjetos
                  .filter((projeto) => projeto.status === "Pendente")
                  .map((projeto) => (
                    <ProjetoCard key={projeto.id} projeto={projeto} />
                  ))}
                {filteredProjetos.filter((projeto) => projeto.status === "Pendente").length === 0 && (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    Nenhum projeto pendente encontrado.
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="concluidos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjetos
                  .filter((projeto) => projeto.status === "Concluído")
                  .map((projeto) => (
                    <ProjetoCard key={projeto.id} projeto={projeto} />
                  ))}
                {filteredProjetos.filter((projeto) => projeto.status === "Concluído").length === 0 && (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    Nenhum projeto concluído encontrado.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  )
}
