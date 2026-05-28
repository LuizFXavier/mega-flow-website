<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue';

</script>

<template>
    <div class="login 
              h-full
              flex">

        <div class="h-full w-55/100">

        </div>
        <div class="w-45/100 h-full bg-black">
            <LoginForm/>
        </div>
    </div>
</template>

<style scoped>
.login{
    background-image: url("/background/login-bg.gif");
    background-repeat: no-repeat;
    /* background-position: center; */
    background-size: cover;
}
</style>