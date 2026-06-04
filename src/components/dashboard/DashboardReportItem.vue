<script setup lang="ts">

interface Props{
    titulo:string;
    cargo:string;
    andamento:string;
}

const props = defineProps<Props>();

</script>
<template>
    <tr class= "border-y border-gray-border 
                font-inter
                text-xl
                ">
        <td class= "pl-5 py-2">
            <h1 class= "text-gray-900
                        text-2xl">
                <!-- {{ props.titulo }} -->
                  Plataforma Mega Web
            </h1>
            <h2 class= "text-gray-500
                        text-[0.95rem]">
                Atualizado hoje
            </h2>
        </td>
        <td class= "text-center text-gray-700">
            {{ props.cargo }}
        </td>

        <td class= "text-center">
            {{ props.andamento }}
        </td>
        
    </tr>
</template>