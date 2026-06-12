<script setup lang="ts">
</script>

<template>
    <div class="w-full h-2/10
                border border-gray-border
                rounded-2xl">
        
        <div class="w-full h-1/2
                    bg-linear-to-r from-mega-light to-mega-dark
                    flex
                    place-items-center
                    rounded-t-2xl
                    pl-5">
            
            <slot name="top"></slot>
        </div>
        <div class="w-full h-1/2
                    bg-white
                    rounded-b-2xl
                    ">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>