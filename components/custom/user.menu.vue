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
      // {
      //    to: "/profile/history",
      //    icon: "fa6-solid:clock-rotate-left",
      //    name: "Lịch sử",
      // },
      {
         to: "/auth",
         icon: "fa6-solid:right-from-bracket",
         name: "Đăng xuất",
      },
   ];
</script>

<template>
   <ul class="sticky top-3 menu bg-base-100 rounded-box">
      <li v-for="link in links">
         <NuxtLink :to="link.to">
            <Icon :name="link.icon" />
            {{ link.name }}
         </NuxtLink>
      </li>
   </ul>
</template>

<style scoped></style>
