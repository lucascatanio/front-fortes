import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UsuarioAutenticado, NovoUsuario } from "./models/usuario.model";
import type { Projeto, NovoProjeto } from "./models/projeto.model";
import type { Conversa, Mensagem, NovaMensagem } from "./models/mensagem.model";
import type {
  EspecificacoesEmpresa,
  NovasEspecificacoes,
} from "./models/especificacoes.model";
import type {
  EstatisticasEmpresa,
  EstatisticasGerais,
} from "./models/estatisticas.model";

// Interface para o estado de autenticação
interface AuthState {
  usuario: UsuarioAutenticado | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (novoUsuario: NovoUsuario) => Promise<void>;
  logout: () => void;
  verificarAutenticacao: () => void;
}

// Store de autenticação
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      isLoading: false,
      error: null,

      login: async (email, senha) => {
        set({ isLoading: true, error: null });
        try {
          const usuario = await AuthService.login({ email, senha });
          set({ usuario, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      cadastrar: async (novoUsuario) => {
        set({ isLoading: true, error: null });
        try {
          const usuario = await AuthService.cadastrar(novoUsuario);
          set({ usuario, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      logout: () => {
        AuthService.logout();
        set({ usuario: null });
      },

      verificarAutenticacao: () => {
        const usuario = AuthService.getUsuarioAtual();
        set({ usuario });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

// Interface para o estado de projetos
interface ProjetosState {
  projetos: Projeto[];
  projetoAtual: Projeto | null;
  isLoading: boolean;
  error: string | null;
  carregarProjetos: () => Promise<void>;
  carregarProjetosPorInstituicao: (instituicaoId: string) => Promise<void>;
  carregarProjetosPorEmpresa: (empresaId: string) => Promise<void>;
  carregarProjetoPorId: (id: string) => Promise<void>;
  adicionarProjeto: (projeto: NovoProjeto) => Promise<Projeto>;
  atualizarProjeto: (projeto: Projeto) => Promise<void>;
  removerProjeto: (id: string) => Promise<void>;
  avaliarProjeto: (
    id: string,
    nota: number,
    comentario: string
  ) => Promise<void>;
}

// Store de projetos
export const useProjetosStore = create<ProjetosState>()(
  persist(
    (set, get) => ({
      projetos: [],
      projetoAtual: null,
      isLoading: false,
      error: null,

      carregarProjetos: async () => {
        set({ isLoading: true, error: null });
        try {
          const projetos = await ProjetosService.obterTodos();
          set({ projetos, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      carregarProjetosPorInstituicao: async (instituicaoId) => {
        set({ isLoading: true, error: null });
        try {
          const projetos = await ProjetosService.obterPorInstituicao(
            instituicaoId
          );
          set({ projetos, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      carregarProjetosPorEmpresa: async (empresaId) => {
        set({ isLoading: true, error: null });
        try {
          const projetos = await ProjetosService.obterPorEmpresa(empresaId);
          set({ projetos, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      carregarProjetoPorId: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const projeto = await ProjetosService.obterPorId(id);
          set({ projetoAtual: projeto, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      adicionarProjeto: async (projeto) => {
        set({ isLoading: true, error: null });
        try {
          const novoProjeto = await ProjetosService.criar(projeto);
          set((state) => ({
            projetos: [...state.projetos, novoProjeto],
            isLoading: false,
          }));
          return novoProjeto;
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      atualizarProjeto: async (projeto) => {
        set({ isLoading: true, error: null });
        try {
          const projetoAtualizado = await ProjetosService.atualizar(
            projeto.id,
            projeto
          );
          set((state) => ({
            projetos: state.projetos.map((p) =>
              p.id === projeto.id ? projetoAtualizado : p
            ),
            projetoAtual:
              state.projetoAtual?.id === projeto.id
                ? projetoAtualizado
                : state.projetoAtual,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      removerProjeto: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await ProjetosService.excluir(id);
          set((state) => ({
            projetos: state.projetos.filter((projeto) => projeto.id !== id),
            projetoAtual:
              state.projetoAtual?.id === id ? null : state.projetoAtual,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      avaliarProjeto: async (id, nota, comentario) => {
        set({ isLoading: true, error: null });
        try {
          const projetoAvaliado = await ProjetosService.avaliar(
            id,
            nota,
            comentario
          );
          set((state) => ({
            projetos: state.projetos.map((projeto) =>
              projeto.id === id ? projetoAvaliado : projeto
            ),
            projetoAtual:
              state.projetoAtual?.id === id
                ? projetoAvaliado
                : state.projetoAtual,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
    }),
    {
      name: "projetos-storage",
    }
  )
);

// Interface para o estado de mensagens
interface MensagensState {
  conversas: Conversa[];
  conversaAtual: Conversa | null;
  mensagens: Mensagem[];
  isLoading: boolean;
  error: string | null;
  carregarConversasPorUsuario: (usuarioId: string) => Promise<void>;
  carregarConversaPorId: (conversaId: string) => Promise<void>;
  carregarMensagensPorConversa: (conversaId: string) => Promise<void>;
  obterOuCriarConversa: (
    projetoId: string,
    usuarioId1: string,
    usuarioId2: string
  ) => Promise<void>;
  enviarMensagem: (
    conversaId: string,
    novaMensagem: NovaMensagem
  ) => Promise<void>;
  marcarComoLidas: (conversaId: string, usuarioId: string) => Promise<void>;
}

// Store de mensagens
export const useMensagensStore = create<MensagensState>()(
  persist(
    (set) => ({
      conversas: [],
      conversaAtual: null,
      mensagens: [],
      isLoading: false,
      error: null,

      carregarConversasPorUsuario: async (usuarioId) => {
        set({ isLoading: true, error: null });
        try {
          const conversas = await MensagensService.obterConversasPorUsuario(
            usuarioId
          );
          set({ conversas, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      carregarConversaPorId: async (conversaId) => {
        set({ isLoading: true, error: null });
        try {
          const conversa = await MensagensService.obterConversaPorId(
            conversaId
          );
          set({ conversaAtual: conversa, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      carregarMensagensPorConversa: async (conversaId) => {
        set({ isLoading: true, error: null });
        try {
          const mensagens = await MensagensService.obterMensagensPorConversa(
            conversaId
          );
          set({ mensagens, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      obterOuCriarConversa: async (projetoId, usuarioId1, usuarioId2) => {
        set({ isLoading: true, error: null });
        try {
          const conversa = await MensagensService.obterOuCriarConversa(
            projetoId,
            usuarioId1,
            usuarioId2
          );
          set((state) => {
            // Verificar se a conversa já existe no array
            const conversaExistente = state.conversas.find(
              (c) => c.id === conversa.id
            );
            return {
              conversas: conversaExistente
                ? state.conversas
                : [...state.conversas, conversa],
              conversaAtual: conversa,
              isLoading: false,
            };
          });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      enviarMensagem: async (conversaId, novaMensagem) => {
        set({ isLoading: true, error: null });
        try {
          const mensagem = await MensagensService.enviarMensagem(
            conversaId,
            novaMensagem
          );
          set((state) => ({
            mensagens: [...state.mensagens, mensagem],
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      marcarComoLidas: async (conversaId, usuarioId) => {
        set({ isLoading: true, error: null });
        try {
          await MensagensService.marcarComoLidas(conversaId, usuarioId);
          set((state) => ({
            mensagens: state.mensagens.map((mensagem) =>
              mensagem.conversaId === conversaId &&
              mensagem.destinatarioId === usuarioId &&
              !mensagem.lida
                ? { ...mensagem, lida: true }
                : mensagem
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
    }),
    {
      name: "mensagens-storage",
    }
  )
);

// Interface para o estado de especificações
interface EspecificacoesState {
  especificacoes: EspecificacoesEmpresa | null;
  isLoading: boolean;
  error: string | null;
  carregarEspecificacoesPorEmpresa: (empresaId: string) => Promise<void>;
  atualizarEspecificacoes: (
    especificacoes: NovasEspecificacoes
  ) => Promise<void>;
  atualizarDisponibilidade: (
    empresaId: string,
    disponibilidade: boolean
  ) => Promise<void>;
}

// Store de especificações
export const useEspecificacoesStore = create<EspecificacoesState>()(
  persist(
    (set) => ({
      especificacoes: null,
      isLoading: false,
      error: null,

      carregarEspecificacoesPorEmpresa: async (empresaId) => {
        set({ isLoading: true, error: null });
        try {
          const especificacoes = await EspecificacoesService.obterPorEmpresa(
            empresaId
          );
          set({ especificacoes, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      atualizarEspecificacoes: async (especificacoes) => {
        set({ isLoading: true, error: null });
        try {
          const especificacoesAtualizadas =
            await EspecificacoesService.atualizar(especificacoes);
          set({ especificacoes: especificacoesAtualizadas, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      atualizarDisponibilidade: async (empresaId, disponibilidade) => {
        set({ isLoading: true, error: null });
        try {
          await EspecificacoesService.atualizarDisponibilidade(
            empresaId,
            disponibilidade
          );
          set((state) => ({
            especificacoes: state.especificacoes
              ? { ...state.especificacoes, disponibilidade }
              : null,
            isLoading: false,
          }));
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
    }),
    {
      name: "especificacoes-storage",
    }
  )
);

// Interface para o estado de estatísticas
interface EstatisticasState {
  estatisticasEmpresa: EstatisticasEmpresa | null;
  estatisticasGerais: EstatisticasGerais | null;
  isLoading: boolean;
  error: string | null;
  carregarEstatisticasPorEmpresa: (empresaId: string) => Promise<void>;
  carregarEstatisticasGerais: () => Promise<void>;
  calcularEstatisticasEmpresa: (empresaId: string) => Promise<void>;
}

// Store de estatísticas
export const useEstatisticasStore = create<EstatisticasState>()((set) => ({
  estatisticasEmpresa: null,
  estatisticasGerais: null,
  isLoading: false,
  error: null,

  carregarEstatisticasPorEmpresa: async (empresaId) => {
    set({ isLoading: true, error: null });
    try {
      const estatisticas = await EstatisticasService.obterPorEmpresa(empresaId);
      set({ estatisticasEmpresa: estatisticas, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  carregarEstatisticasGerais: async () => {
    set({ isLoading: true, error: null });
    try {
      const estatisticas = await EstatisticasService.obterEstatisticasGerais();
      set({ estatisticasGerais: estatisticas, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  calcularEstatisticasEmpresa: async (empresaId) => {
    set({ isLoading: true, error: null });
    try {
      const estatisticas =
        await EstatisticasService.calcularEstatisticasEmpresa(empresaId);
      set({ estatisticasEmpresa: estatisticas, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
