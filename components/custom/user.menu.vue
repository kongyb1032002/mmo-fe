<script setup lang="ts">
   const links = [
      {
         name: "Home",
         icon: "fa6-solid:house",
         to: "/",
      },
      {
         name: "Nạp tiền",
         icon: "fa6-solid:coins",
         to: "/cashin",
      },
      {
         to: "/profile",
         icon: "fa6-solid:user",
         name: "Thông tin",
      },
      {
         to: "/profile/security",
         icon: "fa6-solid:user-shield",
         name: "Bảo mât",
      },
      {
         to: "/auth",
         icon: "fa6-solid:right-from-bracket",
         name: "Đăng xuất",
      },
   ];
</script>

<template>
   <ul
      class="sticky flex flex-row justify-between drop-shadow-lg top-3 menu menu-md bg-base-100 rounded-box md:block">
      <li class="py-2 font-bold text-center">Menu</li>
      <li v-for="link in links">
         <NuxtLink :to="link.to">
            <Icon :name="link.icon" />
            <span class="hidden md:block">
               {{ link.name }}
            </span>
         </NuxtLink>
      </li>
   </ul>
</template>

<style scoped></style>
