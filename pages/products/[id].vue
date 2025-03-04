<script setup>
  const cart = useCartStore();
  const wishStore = useWishlistStore();

  const toggleWishlist = (product) => {
    if (wishStore.isInWishlist(product.id)) {
      wishStore.getProductToRemove(product.id);
    } else {
      wishStore.addToWishlist(product);
    }
  };
  const route = useRoute();
  const id = route.params.id;

  const product = ref({});
  onBeforeMount(() => {
    const res = fetchApiData(`api/products/${id}`, {}, "GET");
    res.then((response) => {
      console.log(response);
      product.value = response.data;
    });
  });
</script>

<template>
  <div class="w-full min-h-screen flex flex-col justify-center">
    <div
      class="relative flex flex-col md:flex-row space-y-3 rounded-xl shadow-lg p-3 w-full md:space-x-2 mx-auto border border-white bg-white"
    >
      <div class="w-full md:w-1/3 grid place-items-center">
        <img
          :src="apiBase + product.image"
          alt="product image"
          class="rounded-xl"
        />
      </div>
      <div
        class="w-full md:w-2/3 min-h-full flex flex-col justify-around space-y-2 p-3"
      >
        <div class="flex justify-between item-center border-b pb-2">
          <div
            class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 block leading-5 font-mono"
          >
            {{ product?.category?.name || "Loading..." }}
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <p class="text-gray-600 font-bold text-sm ml-1">
              {{ product.rating }}
              <span class="text-gray-500 font-normal"
                >({{ product.rating_count }} reviews)</span
              >
            </p>
          </div>
          <div class="wish-list buttons">
            <button
              @click="toggleWishlist(product)"
              class="rounded-full w-[35px] h-[35px] bg-white flex items-center justify-center"
            >
              <IconsBookmarkDash
                v-if="wishStore.isInWishlist(product.id)"
                class="w-[24px] h-[25px]"
              />

              <IconsBookmark v-else class="w-[25px] h-[25px]" />
              <span
                class="iconify"
                data-icon="material-symbols-light:favorite-outline"
                data-inline="false"
              ></span>
            </button>
          </div>
          
        </div>

        <div class="center flex flex-col h-full justify-start mt-10">
          <h3 class="font-black text-gray-800 md:text-3xl text-xl md:mb-3">
            {{ product.name }}
          </h3>
          <p class="md:text-lg text-gray-500 text-base">
            {{ product.description }}
          </p>
        </div>

        <div
          class="bottom-part flex flex-col items-center md:flex-row justify-between"
        >
          <p class="text-xl font-black text-gray-800">
            ৳{{ product.stock == 0 ? "00.00" : product.price }}
          </p>
          <nuxt-link v-if="cart.isInCart(product.id)" to="/cart">
            <button
              class="add-cart bg-gray-400 hover:bg-gray-500 text-white border-black add-cart py-1 md:py-2 px-2 md:px-5 text-sm font-semibold rounded md:ml-2 mt-2 md:mt-0"
            >
              <span>Go to Cart</span>
            </button>
          </nuxt-link>
          <button
            v-else-if="product.stock == 0"
            class="add-cart py-1 px-2 text-sm font-semibold duration-150border border-black rounded bg-slate-400 text-slate-800 italic cursor-not-allowed"
          >
            Out of stock
          </button>
          <button
            v-else
            @click="cart.addItem(product)"
            class="add-cart py-1 md:py-2 px-2 md:px-5 text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white border-black rounded md:ml-2 mt-2 md:mt-0"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
