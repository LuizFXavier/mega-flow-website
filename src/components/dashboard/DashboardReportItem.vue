<script setup lang="ts">

interface Props{
    titulo:string;
    cargo:string;
    andamento:string;
    dataAtualizacao:string;
}

const props = defineProps<Props>();

function updatedAt(dataAtualizacao: string) {
    const today = new Date();
    const updatedDate = new Date(dataAtualizacao);
    const diffTime = Math.abs(today.getTime() - updatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 2) {
        return "Atualizado hoje";
    } else {
        return `Atualizado ${diffDays} dia${diffDays !== 1 ? "s" : ""} atrás`;
    }
}

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
                {{ updatedAt(props.dataAtualizacao) }}
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