export interface EspecificacoesEmpresa {
  id: string
  empresaId: string
  lixosAceitos: string
  lixosNaoAceitos: string
  pontosColeta: string
  materiaisAceitos: string
  materiaisNaoAceitos: string
  origemLixo: string
  disponibilidade: boolean
}

export interface NovasEspecificacoes {
  empresaId: string
  lixosAceitos: string
  lixosNaoAceitos: string
  pontosColeta: string
  materiaisAceitos: string
  materiaisNaoAceitos: string
  origemLixo: string
  disponibilidade: boolean
}
