<script setup>
definePageMeta({
  layout: "adminlayout",
});

const coupon = useCouponStore();
coupon.fetchCoupons();
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-5">
    <div class="max-w-7xl mx-auto p-4">
      <!-- Add Coupon Button -->
      <button
        v-if="!coupon.showCouAddform && !coupon.showCouUpdateform"
        @click="coupon.showCouAddform = true"
        type="button"
        class="px-6 py-3 rounded-lg text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Add New Coupon
      </button>

      <!-- Add/Update Coupon Form Modal -->
      <div
        v-if="coupon.showCouAddform || coupon.showCouUpdateform"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <form @submit.prevent="coupon.formSubmit()" class="w-full max-w-2xl">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div class="p-6 space-y-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">
                {{ coupon.showCouUpdateform ? 'Update Coupon' : 'Add New Coupon' }}
              </h2>

              <div class="space-y-4">
                <!-- Coupon Code -->
                <div>
                  <label for="code" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coupon Code
                  </label>
                  <input
                    v-model="coupon.couponForm.code"
                    type="text"
                    id="code"
                    placeholder="Enter coupon code"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  />
                </div>

                <!-- Coupon Type -->
                <div>
                  <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coupon Type
                  </label>
                  <select
                    v-model="coupon.couponForm.type"
                    id="type"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  >
                    <option value="fixed">Fixed Amount</option>
                    <option value="percentage">Percentage Discount</option>
                  </select>
                </div>

                <!-- Discount Amount -->
                <div>
                  <label for="discount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount Amount
                  </label>
                  <input
                    v-model="coupon.couponForm.discount"
                    type="text"
                    id="discount"
                    placeholder="Enter discount amount"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200"
                  />
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  @click="coupon.cancelSubmition()"
                  class="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {{ coupon.showCouUpdateform ? 'Update' : 'Add' }} Coupon
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Coupons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        <template v-for="(item, index) in data.coupons" :key="index">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
                  Code: {{ item.code }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">#{{ index + 1 }}</span>
              </div>

              <div class="space-y-2">
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ item.type === 'fixed' ? '$' : '' }}{{ item.discount }}{{ item.type === 'percentage' ? '%' : '' }} Off
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  Type: {{ item.type }}
                </p>
              </div>

              <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="coupon.editCoupon(item)"
                  class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  @click="coupon.deleteCoupon(item.id)"
                  class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
