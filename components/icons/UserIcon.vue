<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="
      showDdMenu
        ? 'scale-110 font-bold shadow-inner shadow-black bg-gradient-to-r from-red-500/50 to-black/50 p-1'
        : ''
    "
    class="w-7 h-7 rounded-full duration-150"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
</template>
