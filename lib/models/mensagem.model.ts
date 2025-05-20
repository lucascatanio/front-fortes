export interface Mensagem {
  id: string
  conversaId: string
  remetenteId: string
  destinatarioId: string
  projetoId: string
  texto: string
  data: string
  lida: boolean
}

export interface Conversa {
  id: string
  projetoId: string
  participantes: string[]
  dataCriacao: string
  ultimaAtualizacao: string
}

export interface NovaMensagem {
  remetenteId: string
  destinatarioId: string
  projetoId: string
  texto: string
}
