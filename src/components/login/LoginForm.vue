<script setup lang="ts">
import { reactive, ref } from 'vue'
import http from '@/services/http.ts'
import LoginFormInputBox from './LoginFormInputBox.vue';

const showPassword = ref<Boolean>(false);

interface UserData{
    email:string;
    senha:string;
}

const user = reactive<UserData>({email:'', senha:''})

async function handleLogin(){
    try{
        const {data} = await http.get('');
        console.log(data)
    }
    catch(e){

    }
}
</script>

<template>
    <div class="w-full h-full
                flex
                justify-center
                content-center">

        <div class ="w-8/10 h-8/10 flex flex-col justify-center place-items-center">

            <h1 class="text-white text-[2.75rem]"> 
                Bem-vindo de volta
            </h1>

            <h2 class="text-[#C0C0C0] text-[1.30rem]
                        mt-2"
                        > 
                        Acesse sua conta Mega
            </h2>
            
            <form class="w-full h-4/10 flex flex-col justify-center">
                <LoginFormInputBox>
                    
                    <img src="/icon/mail.png" 
                         class="w-6 h-5"/>

                    <input v-model="user.email"
                           type="e-mail" 
                           class="h-full w-9/10"/>

                    <div class="w-5 h-5"></div>
                </LoginFormInputBox>
                    
                <LoginFormInputBox>
                    <img src="/icon/lock.png" class="w-5 h-6"/>

                    <input v-model="user.senha"
                           :type="showPassword ? 'text' : 'senha'" 
                           class="h-full w-9/10"/>

                    <button type="button" 
                            @click="showPassword = !showPassword"
                            class="w-6 h-6 
                            flex items-center justify-center 
                            focus:outline-none opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <img 
                            :src="showPassword ? '/icon/eye-open.png' : '/icon/eye-close.png'" 
                            class="w-full h-full object-contain" 
                            alt="Mostrar/Esconder senha"
                        />
                    </button>
                </LoginFormInputBox>
                
            </form>
            <button @click="handleLogin"
                    class="h-8/100 w-full
                         bg-[#8128F4] 
                         border border-[#474747] rounded-2xl">

                    <h2 class="text-white text-2xl 
                                 font-bold">
                        Entrar
                    </h2>
            </button>
        </div>
        
    </div>
    
</template>