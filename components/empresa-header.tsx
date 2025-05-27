"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Recycle, Home, Search, BarChart2, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LeafIcon from "./ui/LeafIcon"

export function EmpresaHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Button
          variant="link"
          onClick={() => router.push("/empresa/dashboard")}
          className="flex items-center space-x-2 p-0"
        >
          <LeafIcon className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">GREENECT</span>
        </Button>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Button
            variant="link"
            onClick={() => router.push("/empresa/dashboard")}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary p-0",
              pathname === "/empresa/dashboard" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Home className="h-4 w-4 mr-2" /> Home
          </Button>

          <Button
            variant="link"
            onClick={() => router.push("/empresa/estatisticas")}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary p-0",
              pathname.includes("/estatisticas") ? "text-primary" : "text-muted-foreground",
            )}
          >
            <BarChart2 className="h-4 w-4 mr-2" /> Estatísticas
          </Button>
          <Button
            variant="link"
            onClick={() => router.push("/empresa/especificacoes")}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary p-0",
              pathname.includes("/especificacoes") ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Settings className="h-4 w-4 mr-2" /> Especificações
          </Button>

          {usuario && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">
                      {usuario.avatar || usuario.nome.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{usuario.nome}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  )
}
