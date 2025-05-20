"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

const tiposLixo = ["Papel", "Plástico", "Vidro", "Metal", "Orgânico", "Eletrônico", "Têxtil", "Madeira", "Óleo"]

export default function EditarProjetoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { projetos, atualizarProjeto, carregarProjetos } = useProjetos()
  const [date, setDate] = useState<Date | undefined>(undefined)
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProjeto = async () => {
      await carregarProjetos()
      const projeto = projetos.find((p) => p.id === params.id)

      if (projeto) {
        // Extrair informações do endereço
        const enderecoRegex = /^([^-]+) - ([^,]+), ([^-]+) - ([^,]+), (.+)$/
        const match = projeto.endereco.match(enderecoRegex)

        let cep = "",
          rua = "",
          numero = "",
          bairro = "",
          estado = ""

        if (match) {
          cep = match[1].trim()
          rua = match[2].trim()
          numero = match[3].trim()
          bairro = match[4].trim()
          estado = match[5].trim()
        }

        // Extract tipo values from tiposLixo (handling both string and object formats)
        const tiposLixoSelecionados = Array.isArray(projeto.tiposLixo)
          ? projeto.tiposLixo.map((item) => (typeof item === "string" ? item : item.tipo))
          : []

        setFormData({
          nome: projeto.nome,
          descricao: projeto.descricao,
          cep,
          rua,
          bairro,
          numero,
          estado,
          quantidadeLixo: projeto.quantidadeLixo.toString(),
          tiposLixoSelecionados,
        })

        setDate(new Date(projeto.data))
      } else {
        router.push("/projetos")
      }
    }

    fetchProjeto()
  }, [params.id, projetos, router, carregarProjetos])

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
      alert("Por favor, selecione uma data para o evento.")
      setIsLoading(false)
      return
    }

    const projeto = projetos.find((p) => p.id === params.id)

    if (!projeto) {
      router.push("/projetos")
      return
    }

    // Calculate quantity per type
    const quantityPerType =
      formData.tiposLixoSelecionados.length > 0
        ? Math.floor(Number(formData.quantidadeLixo) / formData.tiposLixoSelecionados.length)
        : 0

    // Create tiposLixo array with objects
    const tiposLixo = formData.tiposLixoSelecionados.map((tipo) => ({
      tipo,
      quantidade: quantityPerType,
    }))

    const projetoAtualizado = {
      ...projeto,
      nome: formData.nome,
      descricao: formData.descricao,
      data: date,
      endereco: `${formData.cep} - ${formData.rua}, ${formData.numero} - ${formData.bairro}, ${formData.estado}`,
      quantidadeLixo: Number.parseInt(formData.quantidadeLixo) || 0,
      tiposLixo,
    }

    try {
      await atualizarProjeto(projetoAtualizado)
      router.push(`/projetos/${params.id}`)
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error)
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
            <CardTitle className="text-2xl">Editar Projeto</CardTitle>
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
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.push(`/projetos/${params.id}`)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar"}
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
