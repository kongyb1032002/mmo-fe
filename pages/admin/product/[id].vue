<script setup lang="ts">
   definePageMeta({
      layout: "admin",
   });
   const router = useRoute();
   const id = Number(router.params.id);
</script>

<template>
   <section class="space-y-6">
      <CustomProductForm :id="id" />
   </section>
</template>
