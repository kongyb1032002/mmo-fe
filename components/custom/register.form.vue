<script setup lang="ts">
   import { useAuthService } from "~/composables/api/auth.service";
   import { useCoreAxiosInstance } from "~/composables/core/axios.instance";
   import type { RegisterForm } from "~/composables/forms/register.form";
   const { $toast } = useNuxtApp();
   const { change } = defineProps<{
      change: () => void;
   }>();
   const authService = useAuthService();
   const showPassword = ref(false);
   const registerForm = ref<RegisterForm>({
      username: "",
      fullname: "",
      email: "",
      password: "",
      rewritePassword: "",
      // phone: "",
   });
   const confirmPassword = ref("");
   const OnSubmit = async (event: Event) => {
      event.preventDefault();
      registerForm.value.rewritePassword = confirmPassword.value;
      if (registerForm.value.password !== registerForm.value.rewritePassword) {
         $toast("Mật khẩu xác nhận không khớp!", {
            type: "error",
         });
         return;
      }
      if (
         !registerForm.value.email ||
         !registerForm.value.username ||
         !registerForm.value.password
      ) {
         $toast("Vui lòng điền đầy đủ thông tin!", {
            type: "error",
         });
      }
      authService.register(registerForm.value);
   };
</script>

<template>
   <form class="space-y-4 basis-1/2" @submit="OnSubmit">
      <p class="justify-center card-title">Đăng ký</p>
      <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:at" />
         <input
            type="text"
            class="grow"
            placeholder="Email"
            v-model="registerForm.email" />
      </label>
      <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:user" />
         <input
            type="text"
            class="grow"
            placeholder="Username"
            v-model="registerForm.username" />
      </label>
      <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:user" />
         <input
            type="text"
            class="grow"
            placeholder="Full name"
            v-model="registerForm.fullname" />
      </label>
      <!-- <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:phone" />
         <input
            type="tel"
            class="grow"
            placeholder="Phone number..."
            v-model="registerForm.phone" />
      </label> -->
      <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:key" />
         <input
            :type="showPassword ? 'text' : 'password'"
            class="grow"
            placeholder="Input your password..."
            v-model="registerForm.password" />
         <button type="button" @click="showPassword = !showPassword">
            <Icon
               :name="showPassword ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
         </button>
      </label>
      <label class="flex items-center gap-2 input input-bordered">
         <Icon name="fa6-solid:key" />
         <input
            :type="showPassword ? 'text' : 'password'"
            class="grow"
            placeholder="Confirm your password..."
            v-model="confirmPassword" />
         <button type="button" @click="showPassword = !showPassword">
            <Icon
               :name="showPassword ? 'fa6-solid:eye-slash' : 'fa6-solid:eye'" />
         </button>
      </label>
      <div class="">
         <button type="submit" class="w-full btn btn-primary">Đăng ký</button>
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
            Quên mật khẩu?
            <NuxtLink
               type="reset"
               to="/auth/forget"
               class="btn btn-primary btn-sm btn-ghost text-primary">
               Lấy lại mật khẩu
            </NuxtLink>
         </p>
      </div>
   </form>
</template>

<style scoped></style>
