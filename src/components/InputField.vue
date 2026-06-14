<script setup lang="ts">

interface Props{
    type:string;
    placeholder?:string;
}

const {type, placeholder} = defineProps<Props>();

const value = defineModel();

</script>
<template>
    <input  :type="type" 
            :placeholder="placeholder"
            v-model="value"
            class= "w-full 
                    rounded-lg
                    text-base
                    2xl:text-lg
                    px-2
                    py-1
                    2xl:py-2
                    bg-[#F5F5F5]
                    shadow-2xl"/>
</template>