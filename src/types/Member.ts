export class Member {
  rga: string = "";
  nome: string = "";
  email: string = "";
  dataIngresso: string = "";
  dataDesligamento: string = "";
  diretoria: string = "";
  cargo: string = "";

  fotoURL: string | null = null;

  projects:MemberProject[] = [];

  set(member: Member) {
    this.rga = member.rga;
    this.nome = member.nome;
    this.email = member.email;
    this.dataIngresso = member.dataIngresso;
    this.dataDesligamento = member.dataDesligamento;
    this.diretoria = member.diretoria;
    this.cargo = member.cargo;
  }
  clear() {
    this.rga = "";
    this.nome = "";
    this.email = "";
    this.dataIngresso = "";
    this.dataDesligamento = "";
    this.diretoria = "";
    this.cargo = "";
    this.fotoURL = "";

    this.projects = [];
  }

  setFotoURL(url: string) {
    this.fotoURL = url;
  }
}

export type MemberMap = Map<string, Member>;

export interface MemberProject{
  id:string;
  funcao:string;
}

export interface UserAPI {
  sub: string;
  cargo: string;
  nome: string;
  diretoria: string;
  dataIngresso: string;
  dataDesligamento:string;
  email: string;
}

export function parseUser(payload: UserAPI): Member {
  const member = new Member();

  member.rga = payload.sub;
  member.nome = payload.nome;
  member.email = payload.email;
  member.dataIngresso = payload.dataIngresso;
  member.dataDesligamento = payload.dataDesligamento;
  member.diretoria = payload.diretoria;
  member.cargo = payload.cargo;

  return member;
}
