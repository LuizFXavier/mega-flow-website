<script setup lang="ts">

const props = defineProps({
    targetRoute: {type: String, required: true},
    iconUrl:String,
    fullText:Boolean,
    marked:Boolean
});

</script>
<template>
    <RouterLink :to="targetRoute" 
                class="w-full
                       justify-items-center
                       py-4"
                >

        <img :src="props.iconUrl"
             alt="icon"
        >
    </RouterLink>
</template>