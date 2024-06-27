<script setup>
const auth = useAuthStore();
const route = useRoute();
console.log(route.path);
</script>

<template>
  <div
    class="w-56 pt-2 overflow-hidden bg-white rounded-bl-lg shadow-2xl bg-gradient-to-r border-l  border-black from-neutral-500 to-stone-600 "
  >
    <client-only>
      <button
        class="flex w-full items-center p-3 -mt-2 text-sm text-gray-600 bg-stone-300 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
      >
        <img
          class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
          src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
          alt="jane avatar"
        />
        <div class="mx-1">
          <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {{ auth.user.name }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ auth.user.email }}
          </p>
        </div>
      </button>

      <hr class="border-gray-200 dark:border-gray-700" />

      <template v-if="'admin' == auth.user.type">
        <nuxt-link to="/admin">
          <button
            :class="
              route.name === 'admin' ? 'text-gray-400' : 'dark:text-gray-300'
            "
            class="block w-full px-4 py-3 text-sm font-bold text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
          >
            Dashboard
          </button>
        </nuxt-link>
        <nuxt-link to="/">
          <button
            :class="route.path === '/' ? 'text-gray-400' : 'dark:text-gray-300'"
            class="block w-full px-4 py-3 text-sm font-bold text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
          >
            Home
          </button>
        </nuxt-link>
        <hr class="border-gray-200 dark:border-gray-700" />
      </template>
      <template v-if="'customer' == auth.user.type">
        <button
          class="block w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          view profile
        </button>

        <button
          class="flex items-center justify-center w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
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

          Saved
        </button>

        <button
          class="block w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          Orders
        </button>

        <hr class="border-gray-200 dark:border-gray-700" />

        <button
          class="block w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          Invite Friends
        </button>

        <hr class="border-gray-200 dark:border-gray-700" />

        <button
          class="block w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          Help & Support
        </button>
        <button
          class="block w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
        >
          Contact
        </button>
        <hr class="border-gray-200 dark:border-gray-700" />
      </template>
      <button
        @click="auth.logout()"
        class="flex justify-center items-center w-full px-4 py-3 text-sm text-gray-600 bg-gray-300 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white"
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
