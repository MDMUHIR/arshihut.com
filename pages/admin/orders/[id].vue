<script setup>
  definePageMeta({
    layout: "adminlayout",
  });
  const orderStore = useOrderStore();
  const order = ref({});

  onBeforeMount(() => {
    const res = fetchAuthorizedApi(`api/admin/orders/${id}`, {}, "GET");
    res.then((response) => {
      order.value = response.data;
    });
  });

  const route = useRoute();
  const id = route.params.id;

  const orderStatus = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "canceled",
  ];

  const getStatusClass = (status) => {
    return status === "pending"
      ? "bg-blue-300"
      : status === "processing"
      ? "bg-yellow-300"
      : status === "shipped"
      ? "bg-teal-300"
      : status === "delivered"
      ? "bg-green-400"
      : status === "canceled"
      ? "bg-red-500"
      : "bg-indigo-200"; // Default case
  };

  const updateOrder = () => {
    const res = fetchAuthorizedApi(
      "api/admin/orders/update",
      order.value,
      "POST"
    );
    res.then((response) => {
      navigateTo("/admin/orders");
    });
  };
</script>

<template>
  <div
    class="w-full min-h-svh bg-stone-300 dark:bg-[#443c3c] z-2 py-10 md:px-10"
  >
    <div
      class="relative flex flex-col md:flex-row space-y-3 rounded-xl shadow-lg p-3 w-full md:space-x-2 mx-auto border border-white bg-white z-2"
    >
      <div class="w-full bg-white flex flex-col space-y-2 p-3">
        <div class="flex justify-between items-center">
          <p
            class="font-medium text-black bg-rose-200 rounded px-2 border border-black"
          >
            <span class="font-bold">Order Id:</span> {{ order.id }}
          </p>
          <div class="flex">
            <p
              class="text-gray-600 font-bold text-sm ml-1 rounded pl-2 py-1 border border-black"
              :class="getStatusClass(order.status)"
            >
              <span class="font-bold">Status:</span>
              <select
                class="status rounded focus:outline-none focus:shadow-2xl p-1 ml-1"
                v-model="order.status"
              >
                <option
                  class="bg-white"
                  v-for="(status, index) in orderStatus"
                  :value="status"
                  :key="index"
                >
                  {{ status }}
                </option>
              </select>
            </p>
          </div>
        </div>
        <!--  -->
        <div class="center/details grid grid-cols-1 sm:grid-cols-2">
          <div class="name-details">
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">User Id:</span> {{ order.user_id }}
            </p>
            <h3 class="font-black text-gray-600 md:text-2xl text-xl">
              <span class="font-bold">Name:</span> {{ order.name }}
            </h3>
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">Phone:</span> {{ order.phone }}
            </p>
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">Email:</span> {{ order.email }}
            </p>
          </div>
          <div class="order-details">
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">Address:</span> {{ order.address }}
            </p>
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">City:</span> {{ order.city }}
            </p>
            <p class="md:text-lg text-gray-500 text-sm">
              <span class="font-bold">Postal Code:</span>
              {{ order.postal_code }}
            </p>
          </div>
        </div>
        <!--  -->

        <div class="border my-5 p-5">
          <div
            class="flex items-center my-3 border-b shadow-md"
            v-for="product in order.products"
            :key="product.id"
          >
            <!-- <pre>{{ product }}</pre> -->
            <nuxt-link class="w-2/3" :to="`/products/${product.id}`">
              <div class="flex justify-start items-center gap-x-2">
                <img
                  :src="apiBase + product.image"
                  alt="Product Img"
                  class="w-10 xl:w-16"
                />

                <p class="item-name font-semibold">
                  {{ product.name }}
                </p>
              </div>
            </nuxt-link>
            <p class="w-[100px]">${{ product.price }}</p>
            <p class="flex">
              Quantity:
              <input
                class="border px-2 ml-2"
                type="number"
                v-model="product.pivot.quantity"
              />
            </p>
          </div>
        </div>

        <div class="flex justify-between">
          <p class="text-xl font-black text-gray-800">
            <span class="text-gray-600">Coupon:</span> {{ order.coupon }}
          </p>
          <p
            class="text-xl font-black text-gray-800"
            :class="
              order.payment_status === 'pending'
                ? 'text-red-500'
                : 'text-green-500'
            "
          >
            <span class="text-black">Total:</span> ${{
              orderStore.calculateTotalPrice(order.products)
            }}
            <span
              class="text-sm font-black text-gray-800 mx-2 py-1 rounded px-2"
              :class="
                order.payment_method === 'cod'
                  ? 'bg-orange-300'
                  : 'bg-indigo-300'
              "
            >
              {{ order.payment_method }}
            </span>
          </p>
        </div>
        <!--  -->
        <div class="bottom-part flex justify-center">
          <button
            @click="updateOrder()"
            class="px-8 py-2 rounded border border-black bg-blue-400 hover:bg-blue-500 font-bold duration-150 shadow-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>

    <!-- Product Images and Details -->
  </div>
</template>

<style scoped></style>
