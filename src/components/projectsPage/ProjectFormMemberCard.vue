<script setup lang="ts">
interface Props{
    name:string;
}
const {name} = defineProps<Props>();

</script>
<template>
    <div class="border border-[#C2C2C2] rounded-xl">
        {{ name }}
    </div>
</template>