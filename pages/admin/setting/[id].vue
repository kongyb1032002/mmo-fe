<script setup lang="ts">
   definePageMeta({
      layout: "admin",
   });
   const route = useRoute();

   const id = Number(route.params.id);
</script>
<template>
   <section class="space-y-6">
      <CustomSettingForm :id="id" />
   </section>
</template>
