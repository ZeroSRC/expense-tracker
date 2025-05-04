<template>
    <div class="w-full h-screen flex flex-col justify-between gap-2 p-8">
        <div class="flex flex-row justify-between w-full h-[30px]">
            <div>
                {{ $t('LOGO') }}
            </div>
            <a-switch v-model:checked="isThai" checked-children="ไทย" un-checked-children="EN" />
        </div>
        <div class="flex flex-row justify-center">
            <p>{{ $t('welcome') }}</p>
        </div>
        <div class="flex flex-row justify-center h-fit">
            <nuxt-link to="/authen-form">
                <a-button type="primary" shape="round" class="w-[200px]">
                    หน้าหลัก
                </a-button>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';

const { locale } = useI18n();
const isThai = ref(locale.value === 'th');

// เมื่อสลับ switch → เปลี่ยน locale
watch(isThai, (val) => {
    locale.value = val ? 'th' : 'en';
});
</script>