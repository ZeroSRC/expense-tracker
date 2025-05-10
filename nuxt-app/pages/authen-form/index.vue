<template>
    <div class="flex flex-col justify-center h-screen w-screen relative">
        <div class="h-[50%] w-full bg-pink-300 rounded-b-[20px]"></div>
        <div class="h-[50%] w-full"></div>
        <form class="form-container">
            <img src="/assets/images/logo-image.png" class="w-24" >
            <span>
                {{ $t('SIGN_IN') }}
            </span>
            <span>
                If you already regisned
            </span>
            <div class="w-[90%] h-full flex flex-col gap-4">
                <a-input v-model:value="user.username" size="large" :placeholder="$t('LOGIN.USERNAME')" />
                <a-input-password  v-model:value="user.password" size="large" :placeholder="$t('LOGIN.PASSWORD')" />
            </div>
            <button @click.prevent="authenUser()" class="absolute bottom-0 mb-4 h-[40px] rounded-full w-[90%] bg-pink-300 cursor-pointer">
                SIGN IN
            </button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const router = useRouter()
const  user = ref({
    username :'',
    password :''
})
function authenUser (){
    router.push('/home-dashboard')
}

</script>
<style scoped>
.form-container {
    position: absolute;
    height: 400px;
    max-width: 450px;
    width: 85%;
    background-color: white;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(2px 2px 0.7px #c7c7c7);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    gap: 8px;
}
</style>