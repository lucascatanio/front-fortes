import { Button } from "@/components/ui/button"
import { Recycle, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">GREENECT</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="#quem-somos" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Quem somos
            </Link>
            <Link href="#satisfacao" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Satisfação
            </Link>
            <Link href="#comentarios" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Comentários
            </Link>
            <Link href="/login">
              <Button>Login/Cadastre-se</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Somos a <span className="text-green-600">Greenect</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Conheça mais sobre nossa empresa que é perfeita para conectar empresas de reciclagem a instituições
                sociais
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#quem-somos">
                  <Button size="lg" className="w-full sm:w-auto">
                    Saiba Mais
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="w-32 h-32 text-green-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Quem Somos Section */}
        <section id="quem-somos" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quem Somos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A Greenect nasceu da necessidade de conectar quem gera resíduos recicláveis com quem pode dar a eles um
                destino sustentável.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustentabilidade</h3>
                <p className="text-muted-foreground">
                  Promovemos a economia circular, reduzindo o impacto ambiental e incentivando a reciclagem.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conexão</h3>
                <p className="text-muted-foreground">
                  Criamos pontes entre instituições sociais e empresas de reciclagem, facilitando o processo para ambos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Impacto</h3>
                <p className="text-muted-foreground">
                  Geramos impacto positivo no meio ambiente e na sociedade, transformando resíduos em recursos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Satisfação Section */}
        <section id="satisfacao" className="py-20 bg-green-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Satisfação</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Veja como nosso site ajuda o meio ambiente a se tornar mais limpo e seguro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm">
                        "A Greenect revolucionou a forma como gerenciamos os resíduos dos nossos eventos. Agora temos
                        certeza que todo material reciclável tem o destino correto."
                      </p>
                      <p className="mt-2 text-sm font-medium">- Instituto Cultural Verde Vida</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm">
                        "Como empresa de reciclagem, a plataforma nos ajudou a encontrar novas fontes de materiais e
                        expandir nossa operação de forma sustentável."
                      </p>
                      <p className="mt-2 text-sm font-medium">- EcoRecicla Ltda.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Nosso Impacto</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Toneladas de lixo reciclado</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Instituições atendidas</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Satisfação dos usuários</span>
                        <span className="text-sm font-medium">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                  </div>

                  <Link href="/login">
                    <Button className="w-full mt-4">
                      Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comentários Section */}
        <section id="comentarios" className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comentários</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                O que nossos usuários estão dizendo sobre a Greenect
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="font-semibold text-green-600">JC</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">João Carlos</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "A plataforma é intuitiva e fácil de usar. Conseguimos organizar todos os nossos eventos e ter um
                  controle preciso do material reciclável gerado."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="font-semibold text-green-600">MS</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Maria Silva</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Como empresa de reciclagem, a Greenect nos ajudou a encontrar novos parceiros e aumentar o volume de
                  materiais recicláveis que processamos."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="font-semibold text-green-600">PL</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Pedro Lima</h4>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "O suporte da equipe é excelente. Sempre que tivemos dúvidas, fomos prontamente atendidos e todas as
                  questões foram resolvidas rapidamente."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a nós na missão de tornar o mundo mais sustentável. Cadastre-se agora e comece a fazer a
              diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Fazer Login
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                >
                  Cadastrar-se
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
