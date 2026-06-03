<script setup lang="ts">
import { memberService } from '@/services/memberService';
import { useUserStore } from '@/stores/userStore';
import TheHeader from '../TheHeader.vue';


const userStore = useUserStore();

</script>

<template>
    <TheHeader>
        <template v-slot:top>
            <h1 class="text-white text-4xl
                        font-inter
                        ">
                Boa noite, {{userStore.user.nome}}! Bem-vindo ao Mega Flow!
            </h1>
        </template>
    </TheHeader>
</template>