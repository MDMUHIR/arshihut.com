<script setup>
  // -------States------
  const auth = useAuthStore();
  const cart = useCartStore();
  const order = useOrderStore();
  const coupon = useCouponStore();

  const countryCode = ref("+880");
  const number = ref("");
  const deliberyCost = ref(null);
  const couponData = computed(() => coupon.couponData);

  // _______Actions_______

  const customerNumber = computed({
    get() {
      return countryCode.value + number.value;
    },
  });
  const checkout = reactive({
    name: auth.user.name,
    // get phone() {
    //   return countryCode.value + number.value;
    // },
    phone: customerNumber,
    email: auth.user.email,
    line1: "",
    line2: "",
    country: "Bangladesh",
    city: "Dhaka",
    coupon: "",
    notes: "",
    payment_method: "COD",
  });

  const selectedCountryIdx = ref(0);
  const countries = reactive([
    {
      name: "Bangladesh",
      code: "+880",
      cities: [
        "Dhaka",
        "Chittagong",
        "Khulna",
        "Rajshahi",
        "Rangpur",
        "Sylhet",
        "Barishal",
        "Mymensingh",
      ],
    },
  ]);

  const renderCities = () => {
    selectedCountryIdx.value = countries.findIndex(
      (country) => country.name === checkout.country
    );

    if (selectedCountryIdx.value !== -1) {
      countryCode.value = countries[selectedCountryIdx.value].code;
    }
  };

  const createOrder = () => {
    if (
      checkout.name !== "" &&
      checkout.email !== "" &&
      checkout.line1 !== "" &&
      number.value !== ""
    ) {
      const status = order.placeOrder(checkout);
      if (status) {
        navigateTo("/orders");
        launchConfetti();
      } else {
        alert("Failed to place order");
      }
    } else {
      alert("Fields marked with a star are required");
    }
  };

  const deliveryCostDefine = computed(() => {
    if (checkout.country === "Bangladesh") {
      if (checkout.city === "Dhaka") {
        return 60;
      } else {
        return 100;
      }
    } else {
      return "CP";
    }
  });

  const checkoutTotal = computed(() => {
    let total;

    if (couponData.value != null) {
      if (couponData.value.type === "percentage") {
        total =
          cart.totalPrice -
          (cart.totalPrice * couponData.value.discount) / 100 +
          deliveryCostDefine.value;
      } else {
        total =
          cart.totalPrice -
          couponData.value.discount +
          deliveryCostDefine.value;
      }
    } else {
      total = cart.totalPrice + deliveryCostDefine.value;
    }

    // Ensure the result has two decimal places
    return parseFloat(total.toFixed(2));
  });
</script>

<template>
  <div class="bg-gray-50 pb-4 sm:pb-8">
    <div class="page-hero flex justify-center items-center pb-4 sm:pb-8">
      <h1
        class="text-lg md:text-2xl text-center font-bold px-4 sm:px-8 py-2 bg-orange-400 rounded-b-3xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300"
      >
        Checkout
      </h1>
    </div>

    <div
      class="flex flex-col md:flex-row max-w-7xl mx-auto px-4 space-y-5 md:space-x-5"
    >
      <!-- Checkout Form -->
      <div class="space-y-4 w-full">
        <div
          class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
        >
          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            Contact Information
          </h2>
          <form class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Name<span class="text-red-500 ml-1">*</span></label
                >
                <input
                  v-model="checkout.name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email<span class="text-red-500 ml-1">*</span></label
                >
                <input
                  v-model="checkout.email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Country</label
                >
                <select
                  v-model="checkout.country"
                  @change="renderCities()"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                >
                  <option
                    v-for="(country, index) in countries"
                    :key="index"
                    :value="country.name"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Devision</label
                >
                <select
                  v-model="checkout.city"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                >
                  <option
                    v-for="(city, index) in countries[selectedCountryIdx]
                      .cities"
                    :key="index"
                    :value="city"
                  >
                    {{ city }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div
          class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
        >
          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            Shipping Address
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Address Line 1<span class="text-red-500 ml-1">*</span></label
              >
              <input
                v-model="checkout.line1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                placeholder="Street address"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Address Line 2</label
              >
              <input
                v-model="checkout.line2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Phone<span class="text-red-500 ml-1">*</span></label
              >
              <div class="flex w-full">
                <div
                  class="px-3 sm:px-4 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm font-medium"
                >
                  {{ countryCode }}
                </div>
                <input
                  type="number"
                  v-model="number"
                  class="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
        >
          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            Additional Information
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Order Notes</label
              >
              <textarea
                v-model="checkout.notes"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                placeholder="Special instructions for delivery"
              ></textarea>
            </div>

            <div
              class="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0 justify-center items-center"
            >
              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Payment Method</label
                >
                <select
                  v-model="checkout.payment_method"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                >
                  <option value="cod">
                    Cash on Delivery (Pay when you receive)
                  </option>
                  <option value="bkash">bKash (Mobile Banking)</option>
                  <option value="nagad">Nagad (Mobile Banking)</option>
                  <!-- <option value="bank">Bank Transfer</option>
                  <option value="card">Credit/Debit Card</option> -->
                </select>
              </div>

              <div class="w-full">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Coupon Code</label
                >
                <div class="flex">
                  <input
                    v-model="checkout.coupon"
                    class="w-full flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-400 outline-none focus:border-transparent transition duration-200"
                    placeholder="Enter coupon code"
                  />
                  <!-- {{ coupon.couponData }} -->
                  <button
                    type="button"
                    @click="coupon.applyCoupon(checkout)"
                    class="px-3 md:px-6 py-2 bg-orange-400 text-white font-medium rounded-r-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 outline-none focus:ring-offset-2 transition duration-200"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="md:min-w-[20rem]">
        <div
          class="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 sticky top-24"
        >
          <h2 class="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>
          <div class="space-y-4">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>৳{{ cart.totalPrice }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span class="text-orange-500">+ ৳{{ deliveryCostDefine }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Discount</span>
              <span class="text-green-500" v-if="couponData">
                - ৳{{ couponData.discount
                }}<span v-show="couponData.type === 'percentage'">%</span>
              </span>
              <span v-else>-৳0</span>
            </div>
            <div class="border-t border-gray-200 pt-4 mt-4">
              <div class="flex justify-between">
                <span class="text-lg font-semibold text-gray-800">Total</span>
                <div class="text-right">
                  <div class="text-lg font-bold text-gray-800">
                    ৳{{ checkoutTotal }} BDT.
                  </div>
                  <p class="text-xs font-mono italic text-gray-500">
                    including VAT
                  </p>
                </div>
              </div>
            </div>
            <button
              @click="createOrder()"
              class="w-full py-3 px-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 outline-none focus:ring-offset-2 hover:-translate-y-0.5 transition-all duration-200"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
