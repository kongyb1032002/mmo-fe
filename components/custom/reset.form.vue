<script setup lang="ts">
   import { useAuthService } from "~/composables/api/auth.service";
   import type { ResetPasswordModel } from "~/composables/models/reset-password.model";

   const { $toast } = useNuxtApp();
   const router = useRouter();
   const authService = useAuthService();
   const route = useRoute();
   const token = route.query.token as string;
   const confirmPass = ref("");
   const loading = ref(false);
   const form: Ref<ResetPasswordModel> = ref({} as ResetPasswordModel);
   const submit = async () => {
      form.value.token = token;
      if (form.value.newPassword !== confirmPass.value) {
         $toast("Mật khẩu xác nhận không khớp!", {
            type: "error",
         });
         return;
      }
      loading.value = true;
      await authService.reset(form.value).then((res) => {
         $toast("Đặt lại mật khẩu thành công!", {
            type: "success",
            onClose: () => {
               router.push("/auth");
            },
         });
      });
      loading.value = false;
   };
</script>

<template>
   <form
      class="flex flex-col justify-center space-y-4"
      @submit.prevent="submit">
      <p class="justify-center flex-none card-title">Nhập mật khẩu mới</p>
      <div class="space-y-4">
         <label class="flex items-center gap-2 input input-bordered">
            <Icon name="fa6-solid:unlock-keyhole" />
            <input
               type="password"
               class="grow"
               placeholder="New password"
               v-model="form.newPassword" />
         </label>
         <label class="flex items-center gap-2 input input-bordered">
            <Icon name="fa6-solid:key" />
            <input
               v-model="confirmPass"
               type="password"
               class="grow"
               placeholder="Password" />
         </label>
      </div>
      <div class="">
         <button
            type="submit"
            class="w-full btn btn-primary"
            :disabled="loading">
            <span v-if="loading" class="loading loading-spinner loading-sm" />
            <span v-else> Đặt lại mât khẩu</span>
         </button>
      </div>
   </form>
</template>

<style scoped></style>
