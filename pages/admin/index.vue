<script setup>
definePageMeta({
  layout: "adminlayout",

  middleware: ["auth"],
  requiresAuth: true,
  type: "admin",
});

const userCtrl = useUserStore();

const order = useOrderStore();

onBeforeMount(() => {
  userCtrl.fetchAllUsers();
  order.fetchAdminOrders();
});
</script>

<template>
  <div class="main pt-10 place-items-center">
    <!-- <pre></pre> -->
    <ClientOnly>
      <!--  -->
      <div
        class="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 p-4"
      >
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm shadow-black"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-600 to-yellow-400 text-white shadow-yellow-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center font-extrabold"
          >
            P
          </div>
          <div class="p-4 text-right">
            <p
              class="block antialiased font-sans text-xl leading-normal font-normal text-blue-gray-600"
            >
              Product Count
            </p>
            <h4
              class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
            >
              {{ data.products.length }}
            </h4>
          </div>
        </div>
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm shadow-black"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-pink-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.206 2.632a10.938 10.938 0 0 0-2.412 0A1.309 1.309 0 0 0 2.64 3.776a10.538 10.538 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0A1.309 1.309 0 0 0 7.36 6.224a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.937 10.937 0 0 0-2.411 0A1.309 1.309 0 0 0 9.64 3.776a10.538 10.538 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.937 10.937 0 0 0-2.411 0a1.309 1.309 0 0 0-1.155 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m-14 7a10.938 10.938 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.937 10.937 0 0 0-2.411 0a1.309 1.309 0 0 0-1.155 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.937 10.937 0 0 0-2.411 0a1.309 1.309 0 0 0-1.155 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m-14 7a10.932 10.932 0 0 0-2.412 0a1.309 1.309 0 0 0-1.154 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.55 10.55 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.931 10.931 0 0 0-2.411 0a1.309 1.309 0 0 0-1.155 1.144a10.537 10.537 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144m7 0a10.931 10.931 0 0 0-2.411 0a1.309 1.309 0 0 0-1.155 1.144a10.53 10.53 0 0 0 0 2.448c.07.606.556 1.077 1.154 1.144c.795.09 1.617.09 2.412 0a1.309 1.309 0 0 0 1.154-1.144a10.54 10.54 0 0 0 0-2.448a1.309 1.309 0 0 0-1.154-1.144"
              />
            </svg>
          </div>
          <div class="p-4 text-right">
            <p
              class="block antialiased font-sans text-xl leading-normal font-normal text-blue-gray-600"
            >
              Category Count
            </p>
            <h4
              v-if="data.categories !== null"
              class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
            >
              {{ data.categories.length }}
            </h4>
          </div>
        </div>

        <!-- All Users -->
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm shadow-black"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-6 h-6 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="p-4 text-right">
            <p
              class="block antialiased font-sans text-xl leading-normal font-normal text-blue-gray-600"
            >
              Total Users
            </p>
            <h4
              class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
            >
              {{ data.allUsers.length }}
            </h4>
          </div>
          <!-- <div class="border-t border-blue-gray-50 p-4">
            <p
              class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600"
            >
              <strong class="text-green-500">+3%</strong>&nbsp;than last month
            </p>
          </div> -->
        </div>

        <!-- Sales -->
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm shadow-black"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-6 h-6 text-white"
            >
              <path
                d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"
              ></path>
            </svg>
          </div>
          <div class="p-4 text-right">
            <p
              class="block antialiased font-sans text-xl leading-normal font-normal text-blue-gray-600"
            >
             Monthly Orders
            </p>
            <h4
              class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
            >
              {{ order.getCurrentMonthTotalSum().totalOrders }}
            </h4>
          </div>
        </div>
        <!-- Sales -->
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm shadow-black"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="w-6 h-6 text-white"
            >
              <path
                d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"
              ></path>
            </svg>
          </div>
          <div class="p-4 text-right">
            <p
              class="block antialiased font-sans text-xl leading-normal font-normal text-blue-gray-600"
            >
              Monthly Sales
            </p>
            <h4
              class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900"
            >
              ${{ order.getCurrentMonthTotalSum().totalSum }}
            </h4>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
