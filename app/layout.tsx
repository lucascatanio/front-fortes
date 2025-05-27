import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { ProjetosProvider } from "@/lib/projetos-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GREENECT - Gerenciamento de Projetos de Reciclagem",
  description: "Plataforma para gerenciamento de projetos de reciclagem"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ProjetosProvider>
              {children}
              <Toaster />
            </ProjetosProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
