// Dados mockados para substituir o banco de dados
import { v4 as uuidv4 } from "uuid"

// Tipos de usuários
export type TipoUsuario = "instituicao" | "empresa"

// Interface para usuário
export interface Usuario {
  id: string
  nome: string
  email: string
  senha: string
  tipo: TipoUsuario
  documento: string
  endereco: string
  telefone: string
  avatar?: string
}

// Interface para projeto
export interface Projeto {
  id: string
  nome: string
  descricao: string
  instituicaoId: string
  instituicaoNome?: string
  data: string | Date
  endereco: string
  cep?: string
  coordenadas?: {
    latitude: number
    longitude: number
  }
  quantidadeLixo: number
  tiposLixo: Array<string | { tipo: string; quantidade: number }>
  status: "Pendente" | "Em andamento" | "Concluído" | "Desativado"
  avaliacao?: {
    rating: number
    comentario: string
    data: Date
  }
}

// Usuários mockados
export const usuarios: Usuario[] = [
  {
    id: "1",
    nome: "Instituto Cultural Verde Vida",
    email: "instituto@exemplo.com",
    senha: "senha123",
    tipo: "instituicao",
    documento: "12.345.678/0001-90",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    telefone: "(11) 98765-4321",
    avatar: "IV",
  },
  {
    id: "2",
    nome: "EcoRecicla Ltda.",
    email: "empresa@exemplo.com",
    senha: "senha123",
    tipo: "empresa",
    documento: "98.765.432/0001-10",
    endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    telefone: "(11) 91234-5678",
    avatar: "ER",
  },
]

// Projetos mockados
export const projetos: Projeto[] = [
  {
    id: "1",
    nome: "Festival Cultural Primavera",
    descricao:
      "Festival cultural com expectativa de grande público. Precisamos de coleta de materiais recicláveis após o evento.",
    instituicaoId: "1",
    instituicaoNome: "Instituto Cultural Verde Vida",
    data: new Date("2023-12-15"),
    endereco: "01234-567 - Rua das Flores, 123 - Centro, São Paulo - SP",
    cep: "01234-567",
    coordenadas: {
      latitude: -23.55052,
      longitude: -46.633308,
    },
    quantidadeLixo: 120,
    tiposLixo: [
      { tipo: "Papel", quantidade: 45 },
      { tipo: "Plástico", quantidade: 75 },
    ],
    status: "Pendente",
  },
  {
    id: "2",
    nome: "Feira de Artesanato Sustentável",
    descricao:
      "Feira de artesanato com foco em sustentabilidade. Teremos estandes de produtos recicláveis e orgânicos.",
    instituicaoId: "1",
    instituicaoNome: "Instituto Cultural Verde Vida",
    data: new Date("2023-11-20"),
    endereco: "04567-890 - Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    cep: "04567-890",
    coordenadas: {
      latitude: -23.561729,
      longitude: -46.655187,
    },
    quantidadeLixo: 85,
    tiposLixo: [
      { tipo: "Vidro", quantidade: 30 },
      { tipo: "Metal", quantidade: 55 },
    ],
    status: "Em andamento",
  },
  {
    id: "3",
    nome: "Exposição de Arte Contemporânea",
    descricao: "Exposição de arte com materiais recicláveis. Precisaremos de coleta após o término do evento.",
    instituicaoId: "1",
    instituicaoNome: "Instituto Cultural Verde Vida",
    data: new Date("2024-01-10"),
    endereco: "04567-123 - Rua Augusta, 500 - Consolação, São Paulo - SP",
    cep: "04567-123",
    coordenadas: {
      latitude: -23.55354,
      longitude: -46.649795,
    },
    quantidadeLixo: 200,
    tiposLixo: [
      { tipo: "Papel", quantidade: 80 },
      { tipo: "Plástico", quantidade: 70 },
      { tipo: "Eletrônico", quantidade: 50 },
    ],
    status: "Pendente",
  },
  {
    id: "4",
    nome: "Workshop de Reciclagem",
    descricao: "Workshop educativo sobre reciclagem e reaproveitamento de materiais.",
    instituicaoId: "1",
    instituicaoNome: "Instituto Cultural Verde Vida",
    data: new Date("2023-12-05"),
    endereco: "01234-890 - Rua Oscar Freire, 300 - Jardins, São Paulo - SP",
    cep: "01234-890",
    coordenadas: {
      latitude: -23.562881,
      longitude: -46.669865,
    },
    quantidadeLixo: 150,
    tiposLixo: [
      { tipo: "Vidro", quantidade: 50 },
      { tipo: "Metal", quantidade: 50 },
      { tipo: "Orgânico", quantidade: 50 },
    ],
    status: "Concluído",
    avaliacao: {
      rating: 5,
      comentario: "Excelente serviço! A equipe foi muito profissional e pontual.",
      data: new Date("2023-12-06"),
    },
  },
]

// Função para gerar um ID único
export function gerarId(): string {
  return uuidv4()
}

// Função para obter usuário pelo email e senha
export function obterUsuarioPorCredenciais(email: string, senha: string): Usuario | null {
  return usuarios.find((u) => u.email === email && u.senha === senha) || null
}

// Função para adicionar um novo usuário
export function adicionarUsuario(usuario: Omit<Usuario, "id">): Usuario {
  const novoUsuario = { ...usuario, id: gerarId() }
  usuarios.push(novoUsuario as Usuario)
  return novoUsuario as Usuario
}

// Função para obter projetos por instituição
export function obterProjetosPorInstituicao(instituicaoId: string): Projeto[] {
  return projetos.filter((p) => p.instituicaoId === instituicaoId)
}

// Função para adicionar um novo projeto
export function adicionarProjeto(projeto: Omit<Projeto, "id">): Projeto {
  const novoProjeto = { ...projeto, id: gerarId() }
  projetos.push(novoProjeto as Projeto)
  return novoProjeto as Projeto
}

// Função para atualizar um projeto
export function atualizarProjeto(projeto: Projeto): Projeto {
  const index = projetos.findIndex((p) => p.id === projeto.id)
  if (index !== -1) {
    projetos[index] = projeto
  }
  return projeto
}

// Função para remover um projeto
export function removerProjeto(id: string): void {
  const index = projetos.findIndex((p) => p.id === id)
  if (index !== -1) {
    projetos.splice(index, 1)
  }
}
