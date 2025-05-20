"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProjetos } from "@/lib/projetos-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

const tiposLixo = ["Papel", "Plástico", "Vidro", "Metal", "Orgânico", "Eletrônico", "Têxtil", "Madeira", "Óleo"]

export default function CriarProjetoPage() {
  const router = useRouter()
  const { adicionarProjeto } = useProjetos()
  const { toast } = useToast()
  const { usuario } = useAuth()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    estado: "",
    quantidadeLixo: "",
    tiposLixoSelecionados: [] as string[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTipoLixoChange = (tipo: string) => {
    setFormData((prev) => {
      const tiposAtuais = [...prev.tiposLixoSelecionados]
      if (tiposAtuais.includes(tipo)) {
        return {
          ...prev,
          tiposLixoSelecionados: tiposAtuais.filter((t) => t !== tipo),
        }
      } else {
        return {
          ...prev,
          tiposLixoSelecionados: [...tiposAtuais, tipo],
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!date) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data para o evento.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      if (!usuario) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para criar um projeto.",
          variant: "destructive",
        })
        router.push("/login")
        return
      }

      const novoProjeto = {
        nome: formData.nome,
        descricao: formData.descricao,
        instituicaoId: usuario.id,
        instituicaoNome: usuario.nome,
        data: date,
        endereco: `${formData.cep} - ${formData.rua}, ${formData.numero} - ${formData.bairro}, ${formData.estado}`,
        cep: formData.cep,
        coordenadas: {
          latitude: 0,
          longitude: 0,
        },
        quantidadeLixo: Number.parseInt(formData.quantidadeLixo) || 0,
        tiposLixo: formData.tiposLixoSelecionados.map((tipo) => ({
          tipo,
          quantidade: Math.round(Number.parseInt(formData.quantidadeLixo) / formData.tiposLixoSelecionados.length),
        })),
        status: "Pendente",
      }

      await adicionarProjeto(novoProjeto)

      toast({
        title: "Sucesso",
        description: "Projeto criado com sucesso!",
      })

      router.push("/projetos")
    } catch (error) {
      console.error("Erro ao criar projeto:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o projeto. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Criar Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição do evento</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" name="cep" value={formData.cep} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" name="estado" value={formData.estado} onChange={handleInputChange} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rua">Rua</Label>
                  <Input id="rua" name="rua" value={formData.rua} onChange={handleInputChange} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" name="numero" value={formData.numero} onChange={handleInputChange} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="quantidadeLixo">Quantidade estimada de lixo em KG</Label>
                  <Input
                    id="quantidadeLixo"
                    name="quantidadeLixo"
                    type="number"
                    value={formData.quantidadeLixo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label>Tipos de lixo</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {tiposLixo.map((tipo) => (
                      <div key={tipo} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tipo-${tipo}`}
                          checked={formData.tiposLixoSelecionados.includes(tipo)}
                          onCheckedChange={() => handleTipoLixoChange(tipo)}
                        />
                        <label
                          htmlFor={`tipo-${tipo}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tipo}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.push("/projetos")} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Criando..." : "Criar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
