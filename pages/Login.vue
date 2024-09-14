<script setup>
const auth = useAuthStore();
const email = ref("admin@gmail.com");
const password = ref("admin");

const showPassword = ref(false);

const passwordnputType = computed(() =>
  showPassword.value ? "text" : "password"
);
</script>

<template>
  <div class="">
    <ReusableLoader v-if="loading" />
    <div
      class="min-h-screen flex items-center justify-center w-full bg-[url('~/public/images/city.webp')] bg-bottom bg-no-repeat"
    >
      <div
        class="bg-white dark:bg-gray-900 rounded-lg px-8 py-6 max-w-md"
      >
        <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Welcome Back!
        </h1>

        <form @submit.prevent="auth.login(email, password)">
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Email Address</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
            <div v-if="auth.errors !== null" class="errors">
              <p
                class="text-xs text-red-500 font-bold mt-1"
                v-if="auth.errors == 'Unauthorized'"
              >
                ⚠️Wrong Credentials. Try again..!
              </p>
              <p class="text-xs text-red-500 font-bold mt-1" v-else>
                ⚠️Sorry something wents wrong...
              </p>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Password</label
            >
            <div
              class="password-feild flex border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <input
                v-model="password"
                :type="passwordnputType"
                id="password"
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
              <button
                @click="showPassword = !showPassword"
                type="button"
                class="p-2 text-white"
              >
                <IconsHide v-if="showPassword" />
                <IconsShow v-else />
              </button>
            </div>
            <a
              href="#"
              class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >Forgot Password?</a
            >
          </div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                checked
              />
              <label
                for="remember"
                class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >Remember me</label
              >
            </div>
            <nuxt-link to="register">
              <p class="text-sm text-indigo-500 hover:text-indigo-700">
                Create Account
              </p>
            </nuxt-link>
          </div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
