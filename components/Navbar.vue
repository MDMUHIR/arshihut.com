<script setup>
const auth = useAuthStore();
const route = useRoute();
const item = useProductStore();
</script>

<template>
  <div
    class="nab w-full border-b shadow-md bg-gradient-to-r from-[#171717] to-stone-700 fixed top-0 left-0 right-0 text-white z-50"
  >
    <div class="nav-top flex flex-col sm:flex-row justify-between items-center">
      <div
        class="nav-home flex justify-center items-center h-full px-2 oreder-1"
      >
        <nuxt-link to="/">
          <button class="text-2xl font-extrabold duration-150">
            <span
              :class="
                route.path === '/' ? 'bg-gradient-to-r' : 'bg-gradient-to-l  '
              "
              class="bg-clip-text text-transparent from-white to-red-400 hover:from-black hover:to-red-500 duration-150"
            >
              MAVENMART
            </span>
          </button>
        </nuxt-link>
      </div>

      <div
        class="nav-center flex flex-col justify-between items-center py-2 h-full w-full px-2"
      >
        <form
          @submit.prevent="item.getProducts()"
          class="search-bar bg-white flex items-center rounded-lg overflow-hidden p-1 text-black md:w-1/2"
        >
          <input
            v-model="item.searchInputText"
            type="text "
            class="px-2 w-full rounded outline-none text-sm"
            placeholder="Search"
          />
          <button class="border-l-2 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path
                d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
              ></path>
            </svg>
          </button>
        </form>

        <!-- -------------------------------------------
        nav customer items
        ------------------------------------------- -->

        <div
          class="nav-customer-items flex justify-center items-center gap-4 mt-2"
        >
          <nuxt-link to="/products">
            <button
              :class="
                route.path === '/products'
                  ? 'text-orange-500 scale-110 font-bold  px-2 rounded bg-white shadow-inner '
                  : 'font-semibold'
              "
              class="nav-item text-sm relative mx-2 before:bg-orange-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 duration-150"
            >
              Products
            </button>
          </nuxt-link>
          <nuxt-link to="/categories">
            <button
              :class="
                route.path === '/categories'
                  ? 'text-orange-500 scale-110 font-bold  px-2 rounded bg-white shadow-inner'
                  : 'font-semibold'
              "
              class="nav-item text-sm relative mx-2 before:bg-orange-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 duration-150 p-0"
            >
              Categories
            </button>
          </nuxt-link>

          <!-- <button
            :class="
              route.path === '/support'
                ? 'text-orange-500 scale-110 font-bold  px-2 rounded bg-white shadow-inner'
                : 'font-semibold'
            "
            class="nav-item text-sm relative mx-2 before:bg-orange-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 duration-150p-0"
          >
            Support
          </button> -->
        </div>
      </div>

      <div class="nav-end flex flex-row justify-between items-center">
        <nuxt-link to="/cart">
          <iconsCartIcon />
        </nuxt-link>
        <div class="z-10">
          <client-only>
            <button
              v-if="auth.isAuthenticated"
              @click="togDropdMenu()"
              class="relative mx-2 rounded-full text-sm font-medium before:bg-violet-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 p-0 hover:scale-125 duration-300"
            >
              <IconsUserIcon />
            </button>

            <nuxt-link v-else to="/login">
              <button
                class="relative flex mx-2 text-sm font-medium before:bg-orange-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
                    clip-rule="evenodd"
                  />
                </svg>

                Login
              </button>
            </nuxt-link>
          </client-only>
        </div>

        <dropdown v-if="showDdMenu" class="absolute right-0 top-16 mt-3 z-10" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
