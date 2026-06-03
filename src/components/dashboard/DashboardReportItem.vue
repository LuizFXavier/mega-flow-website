<script setup lang="ts">

interface Props{
    titulo:string;
    cargo:string;
    andamento:string;
}

const props = defineProps<Props>();

</script>
<template>
    <div class="w-full
                flex flex-row">
        {{ props.titulo }}
        {{ props.cargo }}
        {{ props.andamento }}
    </div>
</template>