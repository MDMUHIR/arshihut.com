<script setup>
  definePageMeta({
    layout: "adminlayout",

    middleware: ["auth"],
    requiresAuth: true,
    type: "admin",
  });

  const userCtrl = useUserStore();

  const auth = useAuthStore();
  const user = useUserStore();
  const productStore = useProductStore();
  const order = useOrderStore();

  onBeforeMount(async () => {
    await Promise.all([
      userCtrl.fetchAllUsers(),
      order.fetchAdminOrders(),
      user.fetchAllUsers(),
    ]);
  });
</script>

<template>
  <div
    class="main pt-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen"
  >
    <ClientOnly>
      <div class="mb-12 grid gap-y-6 gap-x-6 md:grid-cols-2 xl:grid-cols-4 p-6">
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
              <!-- Icon from All by undefined - undefined -->
              <path
                d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4z"
                fill="currentColor"
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
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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

        <!-- Monthly Orders -->
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
              />
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
              {{ order.getMonthlyOrders().totalOrders }}
            </h4>
          </div>
        </div>

        <!-- Sales -->
        <div
          class="card relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div
            class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-cyan-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
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
              ${{ order.getMonthlyOrders().totalSum }}
            </h4>
          </div>
        </div>
      </div>

      <div class="Out_Of_Stock px-6 mt-8">
        <h1
          class="text-3xl font-bold dark:text-white mb-6 border-l-4 border-red-500 pl-4 flex items-center"
        >
          <span class="mr-2">Out of Stock</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
            >(Items requiring attention)</span
          >
        </h1>

        <AdminProductList
          :filteredProducts="productStore.filterOutOfStockProducts()"
          v-if="productStore.filterOutOfStockProducts().length > 0"
        />
        <p v-else class="text-cyan-500">There are no products out of stock.</p>
      </div>

      <ReusableProductForm />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
