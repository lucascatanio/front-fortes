"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmpresaHeader } from "@/components/empresa-header"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Recycle, Truck, Package, Star } from "lucide-react"

export default function EstatisticasEmpresaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <EmpresaHeader />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Painel de Estatísticas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Número de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quilometragem Percorrida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342 km</div>
              <p className="text-xs text-muted-foreground">Média de 14.25 km por evento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Lixo Coletado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.850 kg</div>
              <p className="text-xs text-muted-foreground">+250 kg em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                4.8
                <Star className="h-5 w-5 ml-1 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground">Baseado em 18 avaliações</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lixo">
          <TabsList className="mb-4">
            <TabsTrigger value="lixo">Tipos de Lixo</TabsTrigger>
            <TabsTrigger value="parceiros">Instituições Parceiras</TabsTrigger>
          </TabsList>

          <TabsContent value="lixo">
            <Card>
              <CardHeader>
                <CardTitle>Total de Quantidade de Lixo por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <div className="font-medium">Plástico</div>
                      </div>
                      <div className="text-sm text-muted-foreground">720 kg</div>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <div className="font-medium">Papel</div>
                      </div>
                      <div className="text-sm text-muted-foreground">520 kg</div>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                        <div className="font-medium">Vidro</div>
                      </div>
                      <div className="text-sm text-muted-foreground">310 kg</div>
                    </div>
                    <Progress value={31} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                        <div className="font-medium">Metal</div>
                      </div>
                      <div className="text-sm text-muted-foreground">180 kg</div>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="font-medium">Eletrônico</div>
                      </div>
                      <div className="text-sm text-muted-foreground">120 kg</div>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parceiros">
            <Card>
              <CardHeader>
                <CardTitle>Instituições Parceiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Instituto Cultural Verde Vida</div>
                      <div className="text-sm text-muted-foreground">8 eventos</div>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Associação Ambiental Recicla Mais</div>
                      <div className="text-sm text-muted-foreground">6 eventos</div>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">ONG Planeta Verde</div>
                      <div className="text-sm text-muted-foreground">5 eventos</div>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Fundação Ambiental Sustentável</div>
                      <div className="text-sm text-muted-foreground">3 eventos</div>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Centro Cultural Eco Vida</div>
                      <div className="text-sm text-muted-foreground">2 eventos</div>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Impacto Ambiental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">1.480 kg</div>
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
                  <div className="text-xl font-bold">74 kg</div>
                  <p className="text-sm text-muted-foreground">CO₂ não emitido</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logística</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Truck className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">18</div>
                  <p className="text-sm text-muted-foreground">Coletas realizadas</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Package className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <div className="text-xl font-bold">6</div>
                  <p className="text-sm text-muted-foreground">Coletas agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
