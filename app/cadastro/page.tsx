"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function CadastroPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cadastrar, isLoading, error } = useAuth()

  const [formData, setFormData] = useState({
    nome: "",
    documento: "",
    endereco: "",
    telefone: "",
    email: "",
    senha: "",
    tipo: "instituicao", // "instituicao" ou "empresa"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTipoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipo: value as "instituicao" | "empresa" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Usar o método de cadastro do AuthContext
      await cadastrar(formData)

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Sua conta foi criada. Você será redirecionado para a página inicial.",
      })

      // Redirecionar com base no tipo de usuário
      if (formData.tipo === "empresa") {
        router.push("/empresa/dashboard")
      } else {
        router.push("/projetos")
      }
    } catch (err) {
      toast({
        title: "Erro ao cadastrar",
        description: error || "Ocorreu um erro ao tentar criar sua conta. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Recycle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Greenect</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>Crie sua conta para começar a usar a plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Cadastro</Label>
                  <RadioGroup value={formData.tipo} onValueChange={handleTipoChange} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="instituicao" id="instituicao" />
                      <Label htmlFor="instituicao" className="cursor-pointer">
                        Instituição Social
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="empresa" id="empresa" />
                      <Label htmlFor="empresa" className="cursor-pointer">
                        Empresa de Reciclagem
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da {formData.tipo === "instituicao" ? "Instituição" : "Empresa"}</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento">CNPJ ou CPF</Label>
                  <Input
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                  Faça login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
