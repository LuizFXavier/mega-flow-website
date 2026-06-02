export class Member{

    rga:string ='';
    nome:string ='';
    email:string ='';
    dataIngresso:string ='';
    diretoria:string ='';
    cargo:string ='';

    set(member:Member){
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
    sub:string,
    cargo:string
}