<script setup lang="ts">
   import { useAuthService } from "~/composables/api/auth.service";

   const router = useRouter();
   const email = ref("");
   const authService = useAuthService();
   const isLoading = ref(false);
   const submit = async () => {
      isLoading.value = true;
      await authService.forget(email.value);
      isLoading.value = false;
   };
</script>

<template>
   <form
      class="flex flex-col justify-center space-y-4"
      @submit.prevent="submit">
      <p class="justify-center flex-none card-title">Quên mật khẩu</p>
      <div class="space-y-4">
         <label class="flex items-center gap-2 input input-bordered">
            <Icon name="fa6-solid:at" />
            <input
               type="text"
               class="grow"
               placeholder="Email"
               v-model="email" />
         </label>
      </div>
      <div class="">
         <button
            type="submit"
            class="w-full btn btn-primary"
            :disabled="isLoading">
            <span
               v-if="isLoading"
               class="loading loading-spinner loading-sm"></span>
            <span v-else> Gửi mail </span>
         </button>
         <p class="flex-none text-center">
            Bạn đã có tài khoản?
            <NuxtLink
               to="/auth"
               type="reset"
               class="btn btn-primary btn-sm btn-ghost text-primary">
               Đăng nhập ngay
            </NuxtLink>
         </p>
         <p class="flex-none text-center">
            Bạn chưa có tài khoản?
            <NuxtLink
               type="reset"
               to="/auth/register"
               class="btn btn-primary btn-sm btn-ghost text-primary">
               Đăng ký ngay
            </NuxtLink>
         </p>
      </div>
   </form>
</template>
