<template>
    <div class="flex flex-col gap-4 h-full">
        <div class="flex place-items-center gap-2">
            <slot name="title"></slot>
        </div>
        <div class=" bg-[#F5F5F5] 
                      border border-[#C2C2C2] rounded-xl 
                      h-10/10 w-full
                      mb-8
                      flex
                      px-4
                      items-center
                      gap-2">
                <slot>
                </slot>
        </div>
    </div>
</template>