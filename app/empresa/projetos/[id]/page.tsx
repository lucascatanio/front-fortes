"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmpresaHeader } from "@/components/empresa-header"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Package, User, Phone, MapIcon, MessageCircle, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Dados simulados de um projeto específico
const projetoSimulado = {
  id: "1",
  nome: "Projeto 1",
  descricao:
    "Evento cultural com expectativa de grande público. Precisamos de coleta de materiais recicláveis após o evento. Teremos principalmente garrafas plásticas, copos descartáveis e papéis.",
  instituicao: "Instituto Cultural Verde Vida",
  data: new Date("2023-12-15"),
  endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
  cep: "01234-567",
  telefone: "(11) 98765-4321",
  distancia: "5.2 km",
  quantidadeLixo: 120,
  tiposLixo: [
    { tipo: "Papel", quantidade: 45 },
    { tipo: "Plástico", quantidade: 75 },
  ],
  status: "Em andamento",
  avaliacao: 4.8,
}

export default function VerProjetoEmpresaPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <EmpresaHeader />
      <main className="flex-1 container mx-auto p-4">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{projetoSimulado.nome}</CardTitle>
                    <Badge
                      className={projetoSimulado.status === "Finalizado" ? "bg-green-500 mt-2" : "bg-yellow-500 mt-2"}
                    >
                      {projetoSimulado.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-muted-foreground">{projetoSimulado.descricao}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Data</h3>
                      <p className="text-muted-foreground">{projetoSimulado.data.toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Endereço</h3>
                      <p className="text-muted-foreground">{projetoSimulado.endereco}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tipo(s) e Quantidade de Lixo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projetoSimulado.tiposLixo.map((item, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-md">
                        <Package className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <span className="font-medium">{item.tipo}</span>
                          <span className="text-muted-foreground ml-2">({item.quantidade} kg)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 border rounded-md bg-muted/40">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <span className="font-medium">Total</span>
                        <span className="text-muted-foreground ml-2">
                          ({projetoSimulado.tiposLixo.reduce((acc, item) => acc + item.quantidade, 0)} kg)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(projetoSimulado.endereco)}`}
                    target="_blank"
                  >
                    <Button className="w-full">
                      <MapIcon className="mr-2 h-4 w-4" /> Ver Rota
                    </Button>
                  </Link>
                  <Link href={`/empresa/chat/${projetoSimulado.id}`}>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" /> Enviar Mensagem
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Instituição Responsável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{projetoSimulado.instituicao}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">{projetoSimulado.avaliacao} (avaliação média)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">CEP</h3>
                      <p className="text-muted-foreground">{projetoSimulado.cep}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Telefone</h3>
                      <p className="text-muted-foreground">{projetoSimulado.telefone}</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Visualizar Perfil da Instituição
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
