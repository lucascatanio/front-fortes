export interface Coordenadas {
  latitude: number
  longitude: number
}

export interface TipoLixo {
  tipo: string
  quantidade: number
}

export interface Avaliacao {
  nota: number
  comentario: string
  data: string
}

export interface Projeto {
  id: string
  nome: string
  descricao: string
  instituicaoId: string
  data: string
  endereco: string
  cep: string
  latitude?: number
  longitude?: number
  coordenadas: Coordenadas
  quantidadeLixo: number
  tiposLixo: TipoLixo[]
  status: "Pendente" | "Em andamento" | "Concluído"
  dataCriacao: string
  empresaAlocadaId: string | null
  avaliacao: Avaliacao | null
  avaliacao_nota?: number
  avaliacao_comentario?: string
  avaliacao_data?: string
}

export interface NovoProjeto {
  nome: string
  descricao: string
  instituicaoId: string
  data: string
  endereco: string
  cep: string
  coordenadas: Coordenadas
  quantidadeLixo: number
  tiposLixo: TipoLixo[]
}
