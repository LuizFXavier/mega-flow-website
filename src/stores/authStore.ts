import { authService } from '@/services/authService';
import type { LoginData } from '@/types/LoginData';
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useUserStore } from './userStore';

export const useAuthStore = defineStore('auth', () => {

  const token: Ref <string | null> = ref(localStorage.getItem('token'));
  const intendedRoute: Ref <string | null> = ref(null);

  async function login(userData:LoginData){

    try{
      const responseToken = await authService.login(userData);
      
      token.value = responseToken;
      localStorage.setItem('token', responseToken);

      const userStore = useUserStore();

      userStore.setUserFromToken(responseToken);
    }
    catch(e){
      throw(e)
    }
    
  }
  function logout(){
    token.value = null;
    localStorage.removeItem('token');

    const userStore = useUserStore();

    userStore.clear();
  }

  function checkToken():boolean{
    return token.value != null;
  }

  function setIntention(intention:string){

    localStorage.setItem('intendedRoute', intention);
    intendedRoute.value = intention;
  }

  function useIntention(){

    if(intendedRoute.value === null){
      return '/'
    }
    
    const intention = intendedRoute.value;

    intendedRoute.value = null;
    localStorage.removeItem('intendedRoute')

    return intention;
  }

  return {
    login,
    logout,
    checkToken,
    setIntention,
    useIntention}
})