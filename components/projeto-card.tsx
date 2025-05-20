import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, Eye } from "lucide-react"

interface ProjetoCardProps {
  projeto: {
    id: string
    nome: string
    status: string
    data: Date | string
    endereco: string
  }
}

export function ProjetoCard({ projeto }: ProjetoCardProps) {
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
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">{projeto.nome}</h3>
          <Badge className={getStatusColor(projeto.status)}>{projeto.status}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{format(new Date(projeto.data), "dd/MM/yyyy", { locale: ptBR })}</span>
          </div>
          <div className="flex items-start">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
            <span className="line-clamp-2">{projeto.endereco}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link href={`/projetos/${projeto.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            <Eye className="h-4 w-4 mr-2" /> Ver
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
