"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProjetosStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function AvaliarProjetoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { projetos, atualizarProjeto } = useProjetosStore()
  const [rating, setRating] = useState(0)
  const [comentario, setComentario] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projeto = projetos.find((p) => p.id === params.id)

    if (!projeto) {
      router.push("/projetos")
      return
    }

    // Em um sistema real, esta avaliação seria enviada para um backend
    // Aqui apenas marcamos o projeto como concluído e voltamos para a lista
    const projetoAtualizado = {
      ...projeto,
      status: "Concluído",
      avaliacao: {
        rating,
        comentario,
        data: new Date(),
      },
    }

    atualizarProjeto(projetoAtualizado)
    router.push("/projetos")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Avaliação da Coleta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-sm font-medium mb-2">Avaliação:</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                      <Star
                        className={`h-8 w-8 ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comentario" className="text-sm font-medium">
                  Adicione comentários sobre a coleta do material
                </label>
                <Textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.push("/projetos")}>
                  Cancelar
                </Button>
                <Button type="submit">Enviar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
