<script setup lang="ts">
   import { useApiSettingService } from "~/composables/api/setting.service";
   import type { SettingModel } from "~/composables/models/setting.model";

   const note_header = ref<SettingModel>({} as SettingModel);
   const note_content = ref<SettingModel>({} as SettingModel);
   const settingService = useApiSettingService();
   const contact_zalo = ref<SettingModel>({} as SettingModel);
   const loading = ref(true);

   onMounted(async () => {
      loading.value = true;
      try {
         const [headerRes, contentRes, zaloRes] = await Promise.all([
            settingService.getByName("NOTE_HEADER"),
            settingService.getByName("NOTE"),
            settingService.getByName("ZALO"),
         ]);
         note_header.value = headerRes;
         note_content.value = contentRes;
         contact_zalo.value = zaloRes;
      } finally {
         loading.value = false;
      }
   });
</script>

<template>
   <section class="flex justify-center">
      <div class="grid grid-cols-5 grid-rows-4 gap-3 max-w-7xl">
         <div
            class="col-span-3 row-span-1 p-10 font-bold text-center text-white align-middle shadow-lg card bg-gradient-to-t from-red-700 to-red-400">
            <p v-html="note_header.val"></p>
         </div>
         <div
            class="h-full col-span-2 row-span-4 p-10 space-y-3 shadow-lg card bg-base-100 text-base-content">
            <h1 class="text-xl font-bold border-l-4 ps-3 border-error">
               Liên hệ
            </h1>
            <div class="flex justify-center">
               <img
                  src="./../public/images/contact.webp"
                  class="rounded-lg shadow-md" />
            </div>
            <div class="flex flex-col gap-3">
               <!-- <button class="btn">Facebook</button> -->
               <a
                  class="btn"
                  target="_blank"
                  href="https://zalo.me/g/etlzlc963">
                  <span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="32"
                        height="32"
                        viewBox="0 0 48 48">
                        <path
                           fill="#2962ff"
                           d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path>
                        <path
                           fill="#eee"
                           d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path>
                        <path
                           fill="#2962ff"
                           d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path>
                        <path
                           fill="#2962ff"
                           d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path>
                        <path
                           fill="#2962ff"
                           d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path>
                        <path
                           fill="#2962ff"
                           d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
                     </svg>
                  </span>
                  <p v-html="contact_zalo.val"></p>
               </a>
               <figure class="flex justify-center">
                  <img
                     src="/images/telegram_qr.jpeg"
                     alt="Telegram QR"
                     class="w-64 h-64 rounded-lg shadow-md" />
               </figure>
            </div>
         </div>
         <div
            class="col-span-3 row-span-2 p-10 space-y-3 shadow-lg card h-fit bg-base-100 text-base-content">
            <h1 class="text-xl font-bold border-l-4 ps-3 border-error">
               Lưu ý
            </h1>
            <p v-html="note_content.val" />
         </div>
      </div>
   </section>
</template>

<style scoped></style>
