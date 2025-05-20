"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Calendar, Package, ArrowRight } from "lucide-react"
import { EmpresaHeader } from "@/components/empresa-header"
import { Footer } from "@/components/footer"
import Link from "next/link"

// Dados simulados de projetos
const projetosSimulados = [
  {
    id: "1",
    nome: "Projeto 1",
    instituicao: "Instituto Cultural Verde Vida",
    data: new Date("2023-12-15"),
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    distancia: "5.2 km",
    quantidadeLixo: 120,
    tiposLixo: ["Papel", "Plástico"],
    status: "Em andamento",
  },
  {
    id: "2",
    nome: "Projeto 2",
    instituicao: "Associação Ambiental Recicla Mais",
    data: new Date("2023-11-20"),
    endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    distancia: "3.8 km",
    quantidadeLixo: 85,
    tiposLixo: ["Vidro", "Metal"],
    status: "Finalizado",
  },
  {
    id: "3",
    nome: "Projeto 3",
    instituicao: "ONG Planeta Verde",
    data: new Date("2024-01-10"),
    endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
    distancia: "7.1 km",
    quantidadeLixo: 200,
    tiposLixo: ["Papel", "Plástico", "Eletrônico"],
    status: "Em andamento",
  },
  {
    id: "4",
    nome: "Projeto 4",
    instituicao: "Fundação Ambiental Sustentável",
    data: new Date("2023-12-05"),
    endereco: "Rua Oscar Freire, 300 - Jardins, São Paulo - SP",
    distancia: "4.5 km",
    quantidadeLixo: 150,
    tiposLixo: ["Vidro", "Metal", "Orgânico"],
    status: "Finalizado",
  },
]

export default function EmpresaDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProjetos, setFilteredProjetos] = useState(projetosSimulados)
  const [filters, setFilters] = useState({
    tipoLixo: "",
    distanciaMax: "",
    quantidadeMin: "",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    let filtered = projetosSimulados

    if (searchTerm) {
      filtered = filtered.filter(
        (projeto) =>
          projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projeto.instituicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projeto.endereco.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filters.tipoLixo) {
      filtered = filtered.filter((projeto) =>
        projeto.tiposLixo.some((tipo) => tipo.toLowerCase().includes(filters.tipoLixo.toLowerCase())),
      )
    }

    if (filters.distanciaMax) {
      filtered = filtered.filter(
        (projeto) => Number.parseFloat(projeto.distancia) <= Number.parseFloat(filters.distanciaMax),
      )
    }

    if (filters.quantidadeMin) {
      filtered = filtered.filter((projeto) => projeto.quantidadeLixo >= Number.parseInt(filters.quantidadeMin))
    }

    setFilteredProjetos(filtered)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <EmpresaHeader />
      <main className="flex-1 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard - Empresa de Reciclagem</h1>
        </div>

        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Pesquisar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" /> Filtros
            </Button>
            <Button type="submit">Buscar</Button>
          </form>

          {showFilters && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo de lixo</label>
                    <Input
                      name="tipoLixo"
                      value={filters.tipoLixo}
                      onChange={handleFilterChange}
                      placeholder="Ex: Papel, Plástico..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Distância máxima (km)</label>
                    <Input
                      name="distanciaMax"
                      type="number"
                      value={filters.distanciaMax}
                      onChange={handleFilterChange}
                      placeholder="Ex: 10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Quantidade mínima (kg)</label>
                    <Input
                      name="quantidadeMin"
                      type="number"
                      value={filters.quantidadeMin}
                      onChange={handleFilterChange}
                      placeholder="Ex: 50"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={applyFilters}>Aplicar Filtros</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="todos">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos os Projetos</TabsTrigger>
            <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
            <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjetos.map((projeto) => (
                <Card key={projeto.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                      <Badge className={projeto.status === "Finalizado" ? "bg-green-500" : "bg-yellow-500"}>
                        {projeto.status}
                      </Badge>
                    </div>
                    <CardDescription>{projeto.instituicao}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-muted-foreground">{projeto.distancia}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-muted-foreground">
                          {new Date(projeto.data).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-muted-foreground">{projeto.quantidadeLixo} kg</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {projeto.tiposLixo.map((tipo, index) => (
                          <Badge key={index} variant="outline">
                            {tipo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-6 py-4 bg-muted/40 flex justify-end">
                    <Link href={`/empresa/projetos/${projeto.id}`}>
                      <Button variant="outline" size="sm">
                        Ver detalhes <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}

              {filteredProjetos.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Nenhum projeto encontrado com os filtros atuais.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="andamento">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjetos
                .filter((projeto) => projeto.status === "Em andamento")
                .map((projeto) => (
                  <Card key={projeto.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                        <Badge className="bg-yellow-500">Em andamento</Badge>
                      </div>
                      <CardDescription>{projeto.instituicao}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">{projeto.distancia}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">
                            {new Date(projeto.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">{projeto.quantidadeLixo} kg</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {projeto.tiposLixo.map((tipo, index) => (
                            <Badge key={index} variant="outline">
                              {tipo}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-4 bg-muted/40 flex justify-end">
                      <Link href={`/empresa/projetos/${projeto.id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalhes <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}

              {filteredProjetos.filter((projeto) => projeto.status === "Em andamento").length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Nenhum projeto em andamento encontrado.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="finalizados">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjetos
                .filter((projeto) => projeto.status === "Finalizado")
                .map((projeto) => (
                  <Card key={projeto.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{projeto.nome}</CardTitle>
                        <Badge className="bg-green-500">Finalizado</Badge>
                      </div>
                      <CardDescription>{projeto.instituicao}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">{projeto.distancia}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">
                            {new Date(projeto.data).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-muted-foreground">{projeto.quantidadeLixo} kg</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {projeto.tiposLixo.map((tipo, index) => (
                            <Badge key={index} variant="outline">
                              {tipo}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-4 bg-muted/40 flex justify-end">
                      <Link href={`/empresa/projetos/${projeto.id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalhes <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}

              {filteredProjetos.filter((projeto) => projeto.status === "Finalizado").length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Nenhum projeto finalizado encontrado.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
