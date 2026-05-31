import type { LoginData } from "@/types/LoginData";
import api from "./api"
import { jwtDecode } from "jwt-decode";
import type { UserAPI } from "@/types/User";

export const authService = {
  
    // Função que recupera o bearer Token baseado na api
    async login(userData:LoginData):Promise<string> {

        try{
            const {data} = await api.post('/auth/signin', userData);
            
            return data.tokenDeAcesso;
        }
        catch(e){
            throw e;
        }
    }
}