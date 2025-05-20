"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmpresaHeader } from "@/components/empresa-header"
import { Footer } from "@/components/footer"
import { Pencil, Check, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function EspecificacoesEmpresaPage() {
  const [editMode, setEditMode] = useState(false)
  const [disponibilidade, setDisponibilidade] = useState(true)
  const [especificacoes, setEspecificacoes] = useState({
    lixosAceitos: "• Papel;\n• Plástico;\n• Vidro;",
    lixosNaoAceitos: "• Lixo hospitalar;\n• Lixo tóxico;",
    pontosColeta: "• Matriz: Av. Paulista, 1000 - São Paulo, SP;\n• Filial: Rua Augusta, 500 - São Paulo, SP;",
    materiaisAceitos: "• Material A;\n• Material B;",
    materiaisNaoAceitos: "• Material C;\n• Material D;",
    origemLixo: "• Eventos culturais;\n• Eventos corporativos;\n• Escolas e universidades;",
  })

  const handleChange = (field: string, value: string) => {
    setEspecificacoes((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Em um sistema real, aqui enviaríamos os dados para o backend
    console.log("Salvando especificações:", especificacoes, "Disponibilidade:", disponibilidade)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <EmpresaHeader />
      <main className="flex-1 container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Especificações</h1>
          {!editMode ? (
            <Button onClick={() => setEditMode(true)}>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditMode(false)}>
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Aplicar
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Lixos aceitos</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.lixosAceitos}
                  onChange={(e) => handleChange("lixosAceitos", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.lixosAceitos}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lixos não aceitos</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.lixosNaoAceitos}
                  onChange={(e) => handleChange("lixosNaoAceitos", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.lixosNaoAceitos}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pontos de coleta</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.pontosColeta}
                  onChange={(e) => handleChange("pontosColeta", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.pontosColeta}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materiais aceitos</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.materiaisAceitos}
                  onChange={(e) => handleChange("materiaisAceitos", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.materiaisAceitos}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materiais não aceitos</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.materiaisNaoAceitos}
                  onChange={(e) => handleChange("materiaisNaoAceitos", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.materiaisNaoAceitos}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Origem do lixo</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={especificacoes.origemLixo}
                  onChange={(e) => handleChange("origemLixo", e.target.value)}
                  rows={5}
                />
              ) : (
                <div className="whitespace-pre-line">{especificacoes.origemLixo}</div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Disponibilidade de coleta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="disponibilidade"
                checked={disponibilidade}
                onCheckedChange={setDisponibilidade}
                disabled={!editMode}
              />
              <Label htmlFor="disponibilidade">
                {disponibilidade ? "Disponível para novas coletas" : "Indisponível para novas coletas"}
              </Label>
            </div>
            {!disponibilidade && (
              <p className="text-sm text-muted-foreground mt-2">
                Quando indisponível, sua empresa não aparecerá para novas solicitações de coleta.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
