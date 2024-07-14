<script setup>
definePageMeta({
  layout: "adminlayout",
});

const coupon = useCouponStore();
coupon.fetchCoupons();

const couponData = reactive({
  code: "",
  type: "fixed",
  discount: "",
});
</script>

<template>


  <form @submit.prevent="coupon.addCoupons(couponData)">
    <div class="md:px-20 pt-6 mb-6">
      <div class="bg-white rounded-md p-6 max-w-2xl mx-auto">
        <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
          Add Coupons
        </h1>
        <div class="space-y-4">
          <div>
            <label for="code" class="text-lx font-serif">Coupon Code:</label>
            <input
              v-model="couponData.code"
              type="text"
              placeholder="Coupon Code"
              id="code"
              class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Coupon Type</label
            >
            <select v-model="couponData.type" class="p-2 border-2 rounded">
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div>
            <label for="discount" class="text-lx font-serif">Discount:</label>
            <input
              v-model="couponData.discount"
              type="text"
              placeholder="Add Discount"
              id="discount"
              class="w-full outline-none py-1 px-2 text-md border-2 rounded-md"
            />
          </div>

          <div class="btn flex justify-between">
            <!-- <button
              @click="category.showAddForm = false"
              class="mx-auto block rounded-md text-lg text-red-600 font-bold border px-4 hover:bg-neutral-200 duration-150"
            >
              Cancel
            </button> -->
            <button
              type="submit"
              class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 duration-150"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>

  <!-- Showing Coupons -->

  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-10 rounded-lg border-2 mb-10"
  >
    <template v-for="(item, index) in data.coupons" :key="index">
      <div
        class="justify-between items-center rounded-lg p-6 shadow-md sm:flex sm:justify-start border"
      >
        <p class="text-xl font-semibold mr-4">{{ index + 1 }}</p>

        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between items-center">
          <div class="mt-5 sm:mt-0">
            <h2 class="text-xl font-bold text-gray-900">{{ item.code }}</h2>
            <p class="mt-1 text-xs text-gray-700">{{ item.type }}</p>
          </div>
          <div class="mt-5 sm:mt-0">
            <h2 class="text-2xl font-bold text-gray-900">
              <span v-if="item.type == 'fixed'">$</span>
              {{ item.discount }}
              <span v-if="item.type == 'percentage'">%</span>
            </h2>
          </div>
          <div
            class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
          >
            <div class="flex items-center space-x-4">
              <button class="cursor-pointer duration-150 hover:text-red-500">
                Edit
              </button>

              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
