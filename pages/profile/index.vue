<script setup lang="ts">
   import { useApiTransactionService } from "~/composables/api/transaction.service";
   import { useApiUserService } from "~/composables/api/user.service";
   import type { OrderModel } from "~/composables/models/order.model ";
   import type { TransactionModel } from "~/composables/models/transaction.model ";
   import type { UserModel } from "~/composables/models/user.model";

   const userService = useApiUserService();
   const transactionService = useApiTransactionService();
   const { $toast } = useNuxtApp();
   const txs: Ref<TransactionModel[]> = ref([] as TransactionModel[]);
   const orders = ref<OrderModel[]>([] as OrderModel[]);
   const user: Ref<UserModel> = ref({} as UserModel);

   const isLoadingTxs = ref(true);
   const isLoadingOrders = ref(true);
   const fetchOrders = async () => {
      isLoadingOrders.value = true;
      userService.userOrder().then((res) => {
         isLoadingOrders.value = false;
         orders.value = res;
      });
   };
   const fetchTxs = async () => {
      isLoadingTxs.value = true;
      transactionService.myTxs().then((res) => {
         isLoadingTxs.value = false;
         txs.value = res;
      });
   };
   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      $toast("Đã copy via vào clipboard, CTRL+V để dán!!!", {
         type: "success",
      });
   };

   onMounted(async () => {
      user.value = await userService.profile();
   });

   const onSubmit = async (event: Event) => {
      event.preventDefault();
      await userService.updateProfile(user.value);
   };

   const columnsOrders = [
      { key: "id", label: "#" },
      { key: "user", label: "Người dùng" },
      { key: "productId", label: "Mã sản phẩm" },
      { key: "price", label: "Giá" },
      { key: "status", label: "Trạng thái" },
      { key: "via", label: "VIA" },
   ];

   const columnsTxs = [
      { key: "id", label: "#" },
      { key: "userId", label: "User Id" },
      { key: "amount", label: "Số tiền" },
      { key: "paymentMethod", label: "Loại giao dịch" },
      { key: "status", label: "Trạng thái" },
      { key: "transactionDate", label: "Ngày giao dịch" },
   ];
</script>

<template>
   <div class="shadow-lg card card-compact bg-base-100">
      <figure>
         <img
            src="https://picsum.photos/seed/picsum/1920/1000"
            class="w-full h-24 overflow-hidden"
            alt="" />
      </figure>
      <div class="flex-row items-center gap-3 card-body">
         <div class="flex items-center gap-3 basis-1/2">
            <div class="avatar">
               <div class="w-24 rounded-full">
                  <img :src="user.avatar" />
               </div>
            </div>
            <div class="space-y-3">
               <h1 class="text-lg font-bold">{{ user.fullname }}</h1>
               <p class="font-bold text-base-content/50">{{ user.email }}</p>
            </div>
         </div>
         <div class="space-y-3">
            <p>
               Số dư:
               <span
                  class="gap-2 badge badge-outline badge-success text-success-content">
                  {{ user.balance }} đ
                  <Icon name="fa6-solid:coins" size="12" />
               </span>
            </p>
            <p>
               Đã thanh toán:
               <span
                  class="gap-2 badge badge-outline badge-info text-info-content">
                  {{ user.paid }} đ
                  <Icon name="fa6-solid:money-bills" size="12" />
               </span>
            </p>
            <p>
               Đã nạp:
               <span
                  class="gap-2 badge badge-outline badge-secondary text-secondary-content">
                  <Icon name="fa6-solid:money-bill-transfer" size="12" />
                  {{ user.deposited }} đ
               </span>
            </p>
         </div>
      </div>
   </div>
   <div class="shadow-lg card card-compact bg-base-100">
      <form class="card-body" @submit="onSubmit">
         <h1 class="card-title">Thông tin người dùng</h1>
         <div class="grid grid-cols-3">
            <label class="space-y-3">
               <p>Tên đăng nhập</p>
               <input
                  type="text"
                  name=""
                  id=""
                  disabled
                  class="input input-bordered"
                  v-model="user.username" />
            </label>
            <label class="space-y-3">
               <p>Email</p>
               <input
                  type="text"
                  name=""
                  id=""
                  class="input input-bordered"
                  v-model="user.email" />
            </label>
            <label class="space-y-3">
               <p>Số điện thoại</p>
               <input
                  type="tel"
                  name=""
                  id=""
                  class="input input-bordered"
                  v-model="user.phone" />
            </label>
            <label class="space-y-3">
               <p>Họ và tên</p>
               <input
                  type="text"
                  name=""
                  id=""
                  class="input input-bordered"
                  v-model="user.fullname" />
            </label>
            <label class="space-y-3">
               <p>Telegram chat id</p>
               <input type="text" name="" id="" class="input input-bordered" />
            </label>
            <label class="space-y-3">
               <p>Ngày đăng ký</p>
               <input type="text" name="" id="" class="input input-bordered" />
            </label>
            <label class="space-y-3">
               <p>Lần đăng nhập gần nhất</p>
               <input type="text" name="" id="" class="input input-bordered" />
            </label>
         </div>
         <button class="font-bold btn btn-primary text-primary-content">
            Lưu
         </button>
      </form>
   </div>
   <MaterialTable
      title="Lịch sử mua hàng"
      :data="txs"
      :fetch="fetchTxs"
      :columns="columnsTxs"
      :is-loading="isLoadingTxs">
      <template #userId="{ row }">
         <span class="font-bold">{{ row.userId }}</span>
      </template>
      <template #status="{ row }">
         <span class="font-bold badge badge-secondary">{{ row.status }}</span>
      </template>
      <template #amount="{ row }">
         <span class="font-bold">{{ row.amount }} đ</span>
      </template>
      <template #paymentMethod="{ row }">
         <span class="font-bold">{{ row.paymentMethod }}</span>
      </template>
      <template #transactionDate="{ row }">
         <span class="font-bold">{{ row.transactionDate }}</span>
      </template>
   </MaterialTable>
   <MaterialTable
      :data="orders"
      :fetch="fetchOrders"
      title="Danh sách đơn hàng"
      :columns="columnsOrders"
      :is-loading="isLoadingOrders">
      <template #user="{ row }">
         <div class="flex items-center gap-3">
            <div class="avatar">
               <div class="w-12 h-12 mask mask-squircle">
                  <img
                     src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                     alt="Avatar Tailwind CSS Component" />
               </div>
            </div>
            <div>
               <div class="font-bold">{{ row.user.email }}</div>
               <div class="text-sm opacity-50">
                  Id: {{ row.userId }} -
                  {{ row.user.username }}
               </div>
            </div>
         </div>
      </template>
      <template #productId="{ row }">
         <span class="font-bold">
            {{ row.productId }}
         </span>
      </template>
      <template #price="{ row }">
         <div class="flex items-center gap-3">
            <div class="">
               <p>Đơn giá: {{ row.price }} đ</p>
               <p>Số lượng: x{{ row.quantity }}</p>
            </div>
            <div class="font-bold">= {{ row.totalAmount }} đ</div>
         </div>
      </template>
      <template #via="{ row }">
         <div class="tooltip" :data-tip="row.via">
            <button class="btn btn-xs" @click="copyToClipboard(row.via)">
               <Icon name="fa6-solid:ellipsis" />
            </button>
         </div>
      </template>
   </MaterialTable>
</template>

<style scoped></style>
