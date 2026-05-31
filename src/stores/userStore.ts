import type { User, UserAPI } from "@/types/User";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { reactive, type Reactive } from "vue";


export const useUserStore = defineStore('user', ()=>{

    const user: Reactive<User> = reactive({rga:'', cargo:''});

    function setUserFromToken(token:string){
        const payload = jwtDecode(token) as UserAPI;
        
        user.rga = payload.sub;
        user.cargo = payload.cargo;
        
        localStorage.setItem('user', JSON.stringify(user));
    }

    function clear(){
        user.cargo = '';
        user.rga = '';
        localStorage.removeItem('user');
    }

    return {setUserFromToken, clear}
});