<script setup>
const auth = useAuthStore();
const route = useRoute();

const currentLayout = computed(() => route.meta.layout || "default");
</script>

<template>
  <div
    class="w-56  overflow-hidden bg-gradient-to-l from-[#171717]/75 to-stone-700/75 rounded-bl-lg shadow-xl shadow-black/50 border-black"
  >
    <client-only>
      <button
        class="flex w-full items-center p-3 font-semibold text-white bg-stone-300 dark:bg-neutral-500 transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white"
      >
        <svg
          height="45px"
          width="45px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 473.935 473.935"
          xml:space="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle
              style="fill: #ea4949"
              cx="236.967"
              cy="236.967"
              r="236.967"
            ></circle>
            <path
              style="fill: #ee6d6d"
              d="M236.952,473.935c78.533,0,148.115-38.222,191.232-97.058c-8.011-11.48-39.525-45.025-145.593-70.548 c0-24.082-2.398-38.507-2.398-38.507s31.289-43.337,33.691-103.513c0-9.568,4.7-77.436-77.017-80.508c0-0.03,0-0.079,0-0.101 c-0.202,0-0.382,0.045-0.602,0.045c-0.21,0-0.385-0.045-0.595-0.045c0,0.022,0,0.075,0,0.101 c-81.702,3.068-77.017,70.941-77.017,80.505c2.398,60.175,33.691,103.513,33.691,103.513s-2.417,14.425-2.417,38.507 C86.664,331.174,54.08,363.623,45.044,375.908C88.104,435.286,157.997,473.935,236.952,473.935z"
            ></path>
            <path
              style="fill: #f7a1a1"
              d="M363.769,60.131H105.586c-2.582,0-4.677,2.095-4.677,4.677v258.183c0,2.582,2.095,4.677,4.677,4.677 h258.183c2.582,0,4.677-2.095,4.677-4.677V64.808C368.446,62.222,366.355,60.131,363.769,60.131z M359.092,318.314H110.263V69.485 h248.829V318.314z"
            ></path>
          </g>
        </svg>
        <div class="mx-1">
          <h1 class="font-semibold text-gray-700 dark:text-gray-200">
            {{ auth.user.name }}
          </h1>
          <p class="font-semibold text-gray-500 dark:text-gray-400">
            {{ auth.user.email }}
          </p>
        </div>
      </button>

      <!-- for admin __-_-_-_--_--__ -->

      <template v-if="'admin' == auth.user.type">
        <nuxt-link to="/admin">
          <button
            :class="
              currentLayout === 'adminlayout'
                ? ' bg-black/75 italic'
                : 'text-gray-100'
            "
            class="block w-full px-4 py-3 mt-2 font-bold capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
          >
            Dashboard
          </button>
        </nuxt-link>
        <nuxt-link to="/">
          <button
            :class="
              currentLayout === 'default'
                ? ' bg-black/75 italic'
                : 'text-gray-100'
            "
            class="block w-full px-4 py-3 font-bold capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
          >
            Customer View
          </button>
        </nuxt-link>
      </template>

      <!-- for customer__-_-_-_--_--__ -->

      <template v-if="'customer' == auth.user.type">
        <nuxt-link to="/wishlist">
          <button
            :class="
              route.path === '/wishlist'
                ? ' font-bold shadow-md shadow-white border-red-600  bg-white dark:bg-neutral-500  text-black '
                : 'text-white'
            "
            class="flex items-center justify-center w-full px-4 py-3 mt-2 font-semibold capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                fill-rule="evenodd"
                d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                clip-rule="evenodd"
              />
            </svg>

            Wishlist
          </button>
        </nuxt-link>
        <nuxt-link to="/orders">
          <button
            :class="
              route.path === '/orders'
                ? ' font-bold  border-red-600  bg-white dark:bg-neutral-500   text-black shadow-md shadow-white'
                : 'text-white'
            "
            class="block w-full px-4 py-3 font-semibold capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
          >
            My Orders
          </button>
        </nuxt-link>

        <!-- <button
          class="block w-full px-4 py-3 font-semibold text-white capitalize transition-colors duration-200 transform  hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
        >
          Invite Friends
        </button> -->

        <hr class="border-gray-200 dark:border-gray-700" />
        <nuxt-link to="/support">
          <button
            :class="
              route.path === '/support'
                ? ' font-bold  border-red-600  bg-white dark:bg-neutral-500  text-black shadow-md shadow-white'
                : 'text-white'
            "
            class="block w-full px-4 py-3 font-semibold capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
          >
            Help & Support
          </button>
        </nuxt-link>
        <hr class="border-gray-200 dark:border-gray-700" />
      </template>
      <button
        @click="auth.logout()"
        class="flex justify-center items-center w-full px-4 py-3 font-semibold text-white capitalize transition-colors duration-200 transform hover:bg-gray-100/50 hover:text-black dark:hover:bg-stone-500 dark:hover:text-white rounded-r-full"
      >
        <!--  @click="authStore.logout()" -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            fill-rule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
            clip-rule="evenodd"
          />
        </svg>

        Log Out
      </button>
      <hr class="border-gray-200 dark:border-gray-700" />
      <button
        @click="togDropdMenu()"
        class="Close w-full py-1 hover:bg-red-600 hover:text-stone-900 px-5 text-red-600 font-bold text-center border-red-500 border-2 rounded-bl-lg bg-stone-900 border-r-0"
      >
        Close
      </button>
    </client-only>
  </div>
</template>

<style scoped></style>
