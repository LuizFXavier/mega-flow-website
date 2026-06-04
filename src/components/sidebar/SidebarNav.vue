<script setup lang="ts">

const props = defineProps({
    targetRoute: {type: String, required: true},
    iconUrl:String,
    isSidebarOpen:Boolean,
    marked:Boolean
});

</script>
<template>
    
    <RouterLink v-show="!isSidebarOpen" :to="targetRoute" 
                class="w-full
                       flex
                       justify-center
                       py-4"
                >

        <img :src="props.iconUrl"
             alt="icon"
        >
    </RouterLink>

    <div v-show="isSidebarOpen"
         class="w-full
                flex
                px-4">
        <RouterLink :to="targetRoute" 
                class="w-full
                       flex
                       place-items-center
                       gap-2
                       py-4"
                >

            <img :src="props.iconUrl"
                alt="icon"
            >
            <slot></slot>
        </RouterLink>
    </div>
</template>