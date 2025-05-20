"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProjetos } from "@/lib/projetos-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CalendarIcon, MapPinIcon, ScaleIcon, TrashIcon, PencilIcon, XCircleIcon } from "lucide-react"

export default function VerProjetoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { projetos, removerProjeto, atualizarProjeto, carregarProjetos } = useProjetos()
  const [projeto, setProjeto] = useState<any | null>(null)

  useEffect(() => {
    const fetchProjeto = async () => {
      await carregarProjetos()
      const projetoEncontrado = projetos.find((p) => p.id === params.id)
      if (projetoEncontrado) {
        setProjeto(projetoEncontrado)
      } else {
        router.push("/projetos")
      }
    }

    fetchProjeto()
  }, [params.id, projetos, router, carregarProjetos])

  if (!projeto) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>
  }

  const handleDelete = async () => {
    await removerProjeto(projeto.id)
    router.push("/projetos")
  }

  const handleDesativar = async () => {
    await atualizarProjeto({
      ...projeto,
      status: projeto.status === "Desativado" ? "Pendente" : "Desativado",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-500"
      case "Concluído":
        return "bg-green-500"
      case "Desativado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{projeto.nome}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <Badge className={getStatusColor(projeto.status)}>{projeto.status}</Badge>
                  </div>
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => router.push(`/projetos/${projeto.id}/editar`)}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDesativar}>
                  <XCircleIcon className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p>{projeto.descricao}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Data</h3>
                  <p>{format(new Date(projeto.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p>{projeto.endereco}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <ScaleIcon className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Quantidade estimada de lixo</h3>
                <p>{projeto.quantidadeLixo} kg</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tipos de lixo</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(projeto.tiposLixo) &&
                  projeto.tiposLixo.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {typeof item === "string" ? item : `${item.tipo} (${item.quantidade} kg)`}
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => router.push("/projetos")}>
              Fechar
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
