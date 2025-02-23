<script setup>
  // Import necessary composables and stores
  const auth = useAuthStore(); // Store for authentication state
  const route = useRoute(); // Vue Router's route object
  const item = useProductStore(); // Store for product-related data and actions

  // Reactive variable to control the visibility of the mobile menu
  const showMenu = ref(false);
</script>

<template>
  <!-- Navigation bar -->
  <nav
    class="nab w-full border-b shadow-md bg-gradient-to-r from-gray-900 to-black fixed top-0 left-0 right-0 text-white z-50"
  >
    <!-- -------------------------------------------
               Navbar top part
        ------------------------------------------- -->
    <div class="nav-top flex justify-between items-center">
      <!-- Left section of the navbar -->
      <div class="nav-left flex justify-center items-center">
        <!-- Mobile menu toggle button (visible only on small screens) -->
        <div class="flex md:hidden mx-3 items-center pt-2 md:pt-0">
          <button @click="showMenu = !showMenu">
            <!-- Animated hamburger icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              >
                <path d="M5 5L19 19M5 19L19 5">
                  <animate
                    fill="freeze"
                    attributeName="d"
                    dur="0.4s"
                    values="M5 5L19 19M5 19L19 5;M5 5L19 5M5 19L19 19"
                  />
                </path>
                <path d="M12 12H12" opacity="0">
                  <animate
                    fill="freeze"
                    attributeName="d"
                    begin="0.2s"
                    dur="0.4s"
                    values="M12 12H12;M5 12H19"
                  />
                  <set
                    fill="freeze"
                    attributeName="opacity"
                    begin="0.2s"
                    to="1"
                  />
                </path>
              </g>
            </svg>
          </button>
        </div>

        <!--  Nav Logo
        ------------------------------------------- -->
        <div
          class="nav-home flex justify-center items-center h-full md:px-5 oreder-1"
        >
          <!-- Logo linking to the home page -->
          <nuxt-link to="/" class="flex items-center justify-center">
            <img
              src="/Logo.png"
              alt="ArshiHut"
              class="w-[190px] h-[3.5rem] p-1"
            />
          </nuxt-link>
        </div>
      </div>

      <!-- -------------------------------------------
                Search bar and navlinks (visible on medium and larger screens)
        ------------------------------------------- -->
      <div class="nav-center hidden md:flex justify-center items-center px-2">
        <!-- Search bar form -->
        <form
          @submit.prevent="item.getProducts()"
          class="search-bar bg-white flex items-center rounded-full overflow-hidden p-1 text-black w-3/4 md:w-1/2 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500"
        >
          <input
            v-model="item.searchInputText"
            type="text "
            class="px-2 w-full outline-none text-sm md:text-lg pl-4"
            placeholder="Search "
          />
          <button class="px-2">
            <!-- Search icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"
              />
            </svg>
          </button>
        </form>

        <!-- -------------------------------------------
                Nav Links
        ------------------------------------------- -->
        <ul class="flex px-4 mx-auto font-heading font-semibold space-x-6">
          <li>
            <!-- Link to Products page with active class -->
            <nuxt-link
              to="/products"
              :class="route.path === '/products' ? 'text-[#f7ac5d]  ' : ''"
              >Products</nuxt-link
            >
          </li>
          <li>
            <!-- Link to Categories page with active class -->
            <nuxt-link
              to="/categories"
              :class="route.path === '/categories' ? 'text-[#f7ac5d]' : ''"
              >Categories</nuxt-link
            >
          </li>
        </ul>
      </div>

      <!-- -------------------------------------------
               Cart and Login section
        ------------------------------------------- -->
      <div class="nav-end flex justify-center items-center pt-3 md:pt-0">
        <!-- Cart icon linking to the cart page -->
        <nuxt-link to="/cart">
          <iconsCartIcon />
        </nuxt-link>

        <!-- User authentication section -->
        <div class="z-10">
          <client-only>
            <!-- If user is authenticated, show user icon with dropdown toggle -->
            <button
              v-if="auth.isAuthenticated"
              @click="togDropdMenu()"
              class="relative mx-2 rounded-full text-sm font-medium before:bg-violet-600 before:absolute before:-bottom-1 before:left-0 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 p-0 hover:scale-125 duration-300"
            >
              <IconsUserIcon />
            </button>

            <!-- If user is not authenticated, show login button -->
            <nuxt-link v-else to="/login">
              <button
                class="relative flex mx-2 text-sm font-medium before:bg-orange-600 before:absolute before:-bottom-1 before:left-[2px] before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 p-0"
              >
                <!-- Login icon -->
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

        <!-- Dropdown menu (visible when toggled) -->
        <dropdown
          v-if="showDdMenu"
          class="absolute right-0 top-16 mt-[18px] sm:mt-[8px] z-10"
        />
      </div>
    </div>

    <!-- -------------------------------------------
                Navbar bottom part (visible on small screens)
        ------------------------------------------- -->
    <div v-if="showMenu" class="nav-bottom block md:hidden">
      <div
        class="nav-center flex flex-col md:flex-row justify-between md:justify-center items-center py-1 w-full px-2 relative mr-4 sm:mr-0"
      >
        <!-- Search bar for mobile view -->
        <form
          @submit.prevent="item.getProducts()"
          class="search-bar bg-white flex items-center rounded-full overflow-hidden p-1 text-black w-3/4 md:w-1/2 focus-within:outline focus-within:outline-2 focus-within:outline-orange-500"
        >
          <input
            v-model="item.searchInputText"
            type="text "
            class="px-2 w-full outline-none text-sm md:text-lg pl-4"
            placeholder="Search "
          />
          <button class="px-2">
            <!-- Search icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[1.4rem]"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.539 15.23q-2.398 0-4.065-1.666Q3.808 11.899 3.808 9.5t1.666-4.065T9.539 3.77t4.064 1.666T15.269 9.5q0 1.042-.369 2.017t-.97 1.668l5.909 5.907q.14.14.15.345q.009.203-.15.363q-.16.16-.354.16t-.354-.16l-5.908-5.908q-.75.639-1.725.989t-1.96.35m0-1q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361T12.9 6.14T9.54 4.77q-1.991 0-3.361 1.37T4.808 9.5t1.37 3.36t3.36 1.37"
              />
            </svg>
          </button>
        </form>

        <!-- Mobile navigation links -->
        <ul class="flex px-4 mx-auto font-heading font-semibold space-x-5 py-1">
          <li>
            <nuxt-link
              to="/products"
              :class="route.path === '/products' ? 'text-[#f7ac5d]  ' : ''"
              >Products</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/categories"
              :class="route.path === '/categories' ? 'text-[#f7ac5d]' : ''"
              >Categories</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
