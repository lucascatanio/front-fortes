"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProjetosStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Trash2 } from "lucide-react"

export default function EstatisticasPage() {
  const { projetos, carregarProjetos } = useProjetosStore()
  const [estatisticas, setEstatisticas] = useState({
    totalColetas: 0,
    totalLixoGerado: 0,
    avaliacaoMedia: 0,
    empresasFrequentes: [] as { nome: string; coletas: number }[],
  })

  useEffect(() => {
    carregarProjetos()

    // Calcular estatísticas
    const projetosConcluidos = projetos.filter((p) => p.status === "Concluído")
    const totalLixo = projetos.reduce((acc, p) => acc + (p.quantidadeLixo || 0), 0)

    // Simulando empresas parceiras (em um sistema real, isso viria do backend)
    const empresas = [
      { nome: "EcoRecicla", coletas: 12 },
      { nome: "Verde Futuro", coletas: 8 },
      { nome: "Recicla Mais", coletas: 7 },
      { nome: "Planeta Limpo", coletas: 5 },
      { nome: "Eco Sustentável", coletas: 3 },
    ]

    setEstatisticas({
      totalColetas: projetosConcluidos.length,
      totalLixoGerado: totalLixo,
      avaliacaoMedia: 4.2, // Valor simulado
      empresasFrequentes: empresas,
    })
  }, [projetos, carregarProjetos])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Estatísticas</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coletas realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.totalColetas}</div>
              <p className="text-xs text-muted-foreground">
                {estatisticas.totalColetas > 0
                  ? `+${Math.round(estatisticas.totalColetas * 0.1)} em relação ao mês anterior`
                  : "Nenhuma coleta realizada ainda"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lixo gerado em KG</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.totalLixoGerado}</div>
              <p className="text-xs text-muted-foreground">
                {estatisticas.totalLixoGerado > 0
                  ? `Média de ${Math.round(estatisticas.totalLixoGerado / (projetos.length || 1))} kg por projeto`
                  : "Nenhum lixo registrado ainda"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avaliação média geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {estatisticas.avaliacaoMedia.toFixed(1)}
                <Star className="h-5 w-5 ml-1 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground">Baseado em {estatisticas.totalColetas} avaliações</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Empresas Parceiras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estatisticas.empresasFrequentes.map((empresa, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{empresa.nome}</div>
                    <div className="text-sm text-muted-foreground">{empresa.coletas} coletas</div>
                  </div>
                  <Progress value={(empresa.coletas / 12) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impacto Ambiental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Trash2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">{Math.round(estatisticas.totalLixoGerado * 0.8)} kg</div>
                  <p className="text-sm text-muted-foreground">Lixo reciclado</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-bold">{Math.round(estatisticas.totalLixoGerado * 0.05)} kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ não emitido</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
