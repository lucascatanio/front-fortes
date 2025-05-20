export interface Parceiro {
  nome: string
  eventos: number
}

export interface EstatisticasEmpresa {
  id: string
  empresaId: string
  eventos: {
    total: number
    emAndamento: number
    finalizados: number
    crescimentoMensal: number
  }
  quilometragem: {
    total: number
    mediaPorEvento: number
  }
  lixoColetado: {
    total: number
    porTipo: Record<string, number>
    crescimentoMensal: number
  }
  avaliacao: {
    media: number
    totalAvaliacoes: number
  }
  parceiros: Parceiro[]
  impactoAmbiental: {
    lixoReciclado: number
    co2NaoEmitido: number
  }
  logistica: {
    coletasRealizadas: number
    coletasAgendadas: number
  }
}

export interface EstatisticasGerais {
  totalProjetos: number
  projetosConcluidos: number
  projetosEmAndamento: number
  projetosPendentes: number
  totalLixoColetado: number
  tiposLixoMaisColetados: Array<{
    tipo: string
    quantidade: number
  }>
}
