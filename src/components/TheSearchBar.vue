<script setup lang="ts">
interface Props{
    text:string;
}
const {text} = defineProps<Props>();

</script>

<template>
    <section class="flex
                    border border-[#6B6B6B]
                    rounded-full
                    place-items-center
                    px-2
                    w-full">
        <img src="/icon/search.png"
             class="w-6 h-6"/>

        <input type="text" 
               :placeholder="text"
               class="w-full h-8/10
                      px-1
                      rounded-full"/>
        <div class="w-6 h-6"></div>
    </section>
</template>