export type TipoUsuario = "instituicao" | "empresa"

export interface Usuario {
  id: string
  email: string
  senha: string
  nome: string
  tipo: TipoUsuario
  avatar: string
  documento: string
  endereco: string
  telefone: string
  dataCadastro: string
}

export interface UsuarioAutenticado {
  id: string
  email: string
  nome: string
  tipo: TipoUsuario
  avatar: string
}

export interface Credenciais {
  email: string
  senha: string
}

export interface NovoUsuario {
  nome: string
  documento: string
  endereco: string
  telefone: string
  email: string
  senha: string
  tipo: TipoUsuario
}
