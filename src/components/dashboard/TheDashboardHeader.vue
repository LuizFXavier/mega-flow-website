<script setup lang="ts">
import { memberService } from "@/services/memberService";
import { useUserStore } from "@/stores/userStore";
import TheHeader from "../TheHeader.vue";

const userStore = useUserStore();

function getSaudation(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia, ";
    if (hour < 18) return "Boa tarde, ";
    return "Boa noite, ";
}
</script>

<template>
    <TheHeader>
        <template v-slot:top>
            <h1 class="text-white text-4xl font-inter">
                {{ getSaudation() }}{{ userStore.user.nome }}! Bem-vindo ao Mega
                Flow!
            </h1>
        </template>
    </TheHeader>
</template>
