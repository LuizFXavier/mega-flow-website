import type { Member } from "@/types/Member";
import api from "./api"

export const memberService = {
  
    // Função que recupera o bearer Token baseado na api
    async getMember(rga:string):Promise<Member> {

        try{
            const {data} = await api.get('/membros/' + rga);
            
            return data;
        }
        catch(e){
            throw e;
        }
    }
}