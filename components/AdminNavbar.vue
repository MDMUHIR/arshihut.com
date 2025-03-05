<script setup>
  const auth = useAuthStore();
  const route = useRoute();

  // Mobile menu state
  const isMobileMenuOpen = ref(false);
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-500 to-emerald-900 text-white shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo/Home Section -->
        <div class="flex-shrink-0 flex items-center">
          <nuxt-link to="/admin" class="flex items-center">
            <button
              :class="[
                'text-xl font-semibold px-4 py-2 rounded-lg transition-all duration-300',
                route.path === '/admin'
                  ? 'bg-emerald-700/50 shadow-inner text-white'
                  : 'hover:bg-emerald-600/30',
              ]"
            >
              Admin Panel
            </button>
          </nuxt-link>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-600/30 focus:outline-none"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              :class="['h-6 w-6', isMobileMenuOpen ? 'hidden' : 'block']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              :class="['h-6 w-6', isMobileMenuOpen ? 'block' : 'hidden']"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Desktop Navigation Items -->
        <div class="hidden md:flex md:items-center md:space-x-4">
          <nuxt-link
            v-for="item in [
              'products',
              'categories',
              'coupons',
              'orders',
              'users',
            ]"
            :key="item"
            :to="`/admin/${item}`"
          >
            <button
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                route.path === `/admin/${item}`
                  ? 'bg-emerald-700/50 shadow-inner scale-105'
                  : 'hover:bg-emerald-600/30 hover:scale-105',
              ]"
            >
              {{ item.charAt(0).toUpperCase() + item.slice(1) }}
            </button>
          </nuxt-link>
        </div>

        <!-- User Menu -->
        <div class="hidden md:flex md:items-center">
          <button
            @click="togDropdMenu"
            v-if="auth.isAuthenticated"
            class="p-2 rounded-full hover:bg-emerald-600/30 transition-colors duration-300"
          >
            <IconsUserIcon class="w-6 h-6" />
          </button>

          <dropdown v-if="showDdMenu" class="absolute right-0 top-[80px]" />
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div
      :class="['md:hidden', isMobileMenuOpen ? 'block' : 'hidden']"
      class="border-t border-emerald-400/30"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <nuxt-link
          v-for="item in [
            'products',
            'categories',
            'coupons',
            'orders',
            'users',
          ]"
          :key="item"
          :to="`/admin/${item}`"
          class="block"
        >
          <button
            :class="[
              'w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300',
              route.path === `/admin/${item}`
                ? 'bg-emerald-700/50 shadow-inner'
                : 'hover:bg-emerald-600/30',
            ]"
          >
            {{ item.charAt(0).toUpperCase() + item.slice(1) }}
          </button>
        </nuxt-link>
      </div>
      <!-- Mobile User Menu -->
      <div class="pt-4 pb-3 border-t border-emerald-400/30">
        <button
          v-if="auth.isAuthenticated"
          @click="togDropdMenu"
          class="w-full px-4 py-2 flex items-center space-x-3 hover:bg-emerald-600/30 transition-colors duration-300"
        >
          <IconsUserIcon class="w-6 h-6" />
          <span>Account</span>
        </button>

        <dropdown v-if="showDdMenu" class="absolute right-0 top-[75px]" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .router-link-active button {
    font-weight: 600;
  }
</style>
