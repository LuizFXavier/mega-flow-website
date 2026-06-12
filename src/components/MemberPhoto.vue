<script setup lang="ts">

interface Props{
    photoUrl:string
}

const {photoUrl} = defineProps<Props>();

</script>

<template>
    <img :src="photoUrl"
         class="rounded-full
                h-full
                aspect-square"/>
</template>