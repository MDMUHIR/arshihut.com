<script setup>
definePageMeta({
  layout: "adminlayout",
});

const order = useOrderStore();
onBeforeMount(() => {
  order.fetchAdminOrders();
});

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
    : "bg-indigo-20"; // Default case
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
</script>

<template>
  <div class="main Admin-Orders pt-5">
    <!-- while there in no order -->
    <div
      v-if="order.orders.length === 0"
      class="rounded-lg w-full flex justify-center items-center"
    >
      <p class="text-center font-light text-2xl italic mt-36 text-red-500">
        !!! There is no order...
      </p>
    </div>
    <div class="orders p-4 grid grid-col-1 md:grid-cols-2 gap-2 ">
      <template v-for="(item, index) in order.orders" :key="index">
        <nuxt-link :to="`orders/${item.id}`">
          <div
            class="rounded-lg p-2 sm:p-6 shadow-md md:border bg-white my-5 sm:my-2 border-2 hover:bg-rose-400 hover:text-white duration-150 relative"
          >
            <div class="top">
              <div class="sm:flex sm:w-full justify-between items-center">
                <p
                  class="text-xl font-semibold absolute top-2 left-2 border px-1 rounded-full border-black bg-white text-black"
                >
                  {{ index + 1 }}
                </p>
                <div class="mt-2 sm:mt-0 border p-1 rounded">
                  <p
                    class="text-xl font-semibold text-gray-900 border text-center px-1 mb-1"
                  >
                    Order id: {{ item.id }}
                  </p>

                  <p
                    class="text-xl font-normal border italic text-gray-900 text-center px-2 pb-1 rounded"
                    :class="getStatusClass(item.status)"
                  >
                    {{ item.status }}
                  </p>
                </div>
                <div class="mt-2 sm:mt-0 text-center border p-1 rounded">
                  <p class="text-xl font-bold text-gray-900 border flex">
                    <IconsUserIcon /> {{ item.name }}
                  </p>

                  <p class="mt-1 text-sm text-gray-700">{{ item.phone }}</p>
                  <p class="mt-1 text-sm text-gray-700">{{ item.email }}</p>
                </div>
                <div class="mt-2 sm:mt-0 border rounded p-1">
                  <p
                    class="text-sm font-bold text-gray-900 border p-1 text-center"
                  >
                    Total Amount
                  </p>
                  <h2
                    class="text-xl font-bold text-red-900 text-center my-1"
                    :class="
                      item.payment_status ? 'text-red-500' : 'text-green-500'
                    "
                  >
                    <!-- ${{ order.calculateTotal(item.products) }} -->
                    ${{ item.total }}
                  </h2>
                  <h2
                    class="text-xl font-normal border italic text-gray-900 text-center bg-purple-300 pb-1 rounded"
                    :class="
                      item.payment_method === 'cod'
                        ? 'bg-orange-300'
                        : 'bg-indigo-500'
                    "
                  >
                    {{ item.payment_method }}
                  </h2>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div
                class="mt-2 flex flex-col md:flex-row justify-between sm:mt-0 text-center p-1"
              >
                <p class="text-xs">
                  Created: {{ formatDate(item.created_at) }}
                </p>
                <p class="text-xs">
                  Updated: {{ formatDate(item.updated_at) }}
                </p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
