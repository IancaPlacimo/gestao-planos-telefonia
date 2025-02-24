import { Plano } from "./plano.model";

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  dataCadastro: string;
  planoId: string;
}
