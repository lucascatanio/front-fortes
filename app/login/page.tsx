"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import LeafIcon from "@/components/ui/LeafIcon"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const usuario = await login(formData.email, formData.senha)

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${usuario.nome}!`,
      })

      // Redirecionar para a página intermediária
      router.push("/redirect")
    } catch (error) {
      console.error("Erro no login:", error)
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos. Por favor, tente novamente.",
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
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-green-100 rounded-full flex items-center justify-center">
                  <LeafIcon width={150} height={150} />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Greenect</h1>
            <p className="text-muted-foreground mt-2">Conectando empresas e instituições sociais pelo meio ambiente</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Entre com suas credenciais para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="senha">Senha</Label>

                  </div>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem conta?{" "}
                <Link href="/cadastro" className="text-green-600 hover:underline">
                  Cadastre-se
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
