<script setup lang="ts">
// TODO: verificar se e-mail e senha foram colocados

import { reactive, ref, watch } from 'vue'
import LoginFormInputBox from './LoginFormInputBox.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useRouter } from 'vue-router';
import type { LoginData } from '@/types/LoginData.ts';

const authStore = useAuthStore();

const showPassword = ref<Boolean>(false);

const user = reactive<LoginData>({email:'', senha:''});

watch(user, ()=>{
    errorState.value = false;
})

const router = useRouter();

const errorState = ref<boolean>(false);

async function handleLogin(){
    try{
        await authStore.login(user);

        const to = authStore.useIntention();

        router.push(to)
    }
    catch(e){
        errorState.value = true;
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
            
            <form class="w-full h-4/10 flex flex-col justify-center gap-4 relative">
                <LoginFormInputBox :class=" errorState ? 'border-[#FF0000]' : ''">
                    
                    <img src="/icon/mail.png"
                         class="w-6 h-5"/>

                    <input v-model="user.email"
                           type="e-mail" 
                           class="h-full w-9/10"
                           placeholder="mega@email.com"/>

                    <div  class="w-5 h-5">
                        <img v-if="errorState" 
                                src="/icon/alert.png" 
                                class="w-full h-full object-contain" 
                                alt="Mostrar/Esconder senha"
                            />
                    </div>
                </LoginFormInputBox>
                    
                <LoginFormInputBox :class=" errorState ? 'border-[#FF0000]' : ''">
                    <img src="/icon/lock.png" class="w-5 h-6"/>

                    <input v-model="user.senha"
                           :type="showPassword ? 'text' : 'password'" 
                           class="h-full w-9/10"
                           placeholder="Mega-senha"/>

                    <button type="button" 
                            @click="showPassword = !showPassword"
                            class="w-6 h-6 
                            flex items-center justify-center 
                            focus:outline-none opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <img v-if="!errorState" 
                            :src="showPassword ? '/icon/eye-open.png' : '/icon/eye-close.png'" 
                            class="w-full h-full object-contain" 
                            alt="Mostrar/Esconder senha"
                        />
                        <img v-else 
                            :src="showPassword ? '/icon/eye-open.png' : '/icon/alert.png'" 
                            class="w-full h-full object-contain" 
                            alt="Mostrar/Esconder senha"
                        />
                    </button>
                </LoginFormInputBox>
                
                <p  v-if="errorState"
                    class="text-[#FF0000] text-sm absolute bottom-5">
                    Seu e-mail ou senha estão incorretos.
                </p>
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