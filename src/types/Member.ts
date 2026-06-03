export class Member{

    rga:string ='';
    nome:string ='';
    email:string ='';
    dataIngresso:string ='';
    diretoria:string ='';
    cargo:string ='';

    set(member:Member){
        this.rga = member.rga;
        this.nome = member.nome;
        this.email = member.email;
        this.dataIngresso = member.dataIngresso;
        this.diretoria = member.diretoria;
        this.cargo = member.cargo;
    }
    clear(){
        this.rga = ''
        this.nome = '';
        this.email = '';
        this.dataIngresso = '';
        this.diretoria = '';
        this.cargo = '';
    }
}

export interface UserAPI{
    sub:string;
    cargo:string;
    nome:string;
    diretoria:string;
    dataIngresso:string;
    email:string;
}

export function parseUser(payload:UserAPI):Member{
    const member = new Member();

    member.rga = payload.sub;
    member.nome = payload.nome;
    member.email = payload.email;
    member.dataIngresso = payload.dataIngresso;
    member.diretoria = payload.diretoria;
    member.cargo = payload.cargo;

    return member;
}