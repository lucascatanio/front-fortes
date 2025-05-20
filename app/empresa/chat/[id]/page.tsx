"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmpresaHeader } from "@/components/empresa-header"
import { Footer } from "@/components/footer"
import { Send, User, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Dados simulados de mensagens
const mensagensIniciais = [
  {
    id: 1,
    remetente: "empresa",
    texto: "Olá! Vi que vocês têm um evento com materiais recicláveis. Podemos ajudar com a coleta.",
    data: new Date("2023-11-20T10:30:00"),
  },
  {
    id: 2,
    remetente: "instituicao",
    texto: "Olá! Sim, teremos um evento cultural no dia 15/12 e precisaremos de coleta de materiais recicláveis.",
    data: new Date("2023-11-20T10:35:00"),
  },
  {
    id: 3,
    remetente: "empresa",
    texto: "Ótimo! Qual a quantidade estimada de materiais que vocês terão?",
    data: new Date("2023-11-20T10:38:00"),
  },
  {
    id: 4,
    remetente: "instituicao",
    texto: "Estimamos cerca de 120kg, sendo 45kg de papel e 75kg de plástico.",
    data: new Date("2023-11-20T10:42:00"),
  },
  {
    id: 5,
    remetente: "empresa",
    texto:
      "Perfeito! Podemos fazer a coleta no final do evento. Vocês preferem que a coleta seja feita no mesmo dia ou no dia seguinte?",
    data: new Date("2023-11-20T10:45:00"),
  },
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [mensagens, setMensagens] = useState(mensagensIniciais)
  const [novaMensagem, setNovaMensagem] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Rolar para o final do chat quando novas mensagens são adicionadas
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [mensagens])

  const enviarMensagem = (e: React.FormEvent) => {
    e.preventDefault()
    if (novaMensagem.trim() === "") return

    const novaMensagemObj = {
      id: mensagens.length + 1,
      remetente: "empresa",
      texto: novaMensagem,
      data: new Date(),
    }

    setMensagens([...mensagens, novaMensagemObj])
    setNovaMensagem("")
  }

  const formatarData = (data: Date) => {
    return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <EmpresaHeader />
      <main className="flex-1 container mx-auto p-4">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <Card className="max-w-4xl mx-auto">
          <CardHeader className="border-b">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle>Instituto Cultural Verde Vida - Projeto 1</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div ref={chatContainerRef} className="h-[500px] overflow-y-auto p-4 space-y-4">
              {mensagens.map((mensagem) => (
                <div
                  key={mensagem.id}
                  className={`flex ${mensagem.remetente === "empresa" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${mensagem.remetente === "empresa" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                  >
                    {mensagem.remetente === "instituicao" && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-green-100 text-green-600 text-xs">IV</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">Instituto Cultural Verde Vida</span>
                      </div>
                    )}
                    <p>{mensagem.texto}</p>
                    <p
                      className={`text-xs mt-1 text-right ${mensagem.remetente === "empresa" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                    >
                      {formatarData(mensagem.data)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <form onSubmit={enviarMensagem} className="flex gap-2">
                <Input
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
